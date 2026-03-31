package com.fareye.labelengine.server.controller;

import com.fareye.labelengine.core.LabelTemplateRenderer;
import com.fareye.labelengine.dto.TemplateDataTypes;
import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.server.dto.LabelRenderRequest;
import com.fareye.labelengine.server.dto.ResponseDto;
import com.fareye.labelengine.server.persistence.LabelTemplateEntity;
import com.fareye.labelengine.server.service.LabelTemplateService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/app/rest/label_generation")
@CrossOrigin(origins = "*")
public class LabelRenderController {
    private static final String STATUS_SUCCESS = "Success";
    private static final String STATUS_FAILED = "Failed";

    private final LabelTemplateService service;
    private final LabelTemplateRenderer renderer = new LabelTemplateRenderer();

    public LabelRenderController(LabelTemplateService service) {
        this.service = service;
    }

    @PostMapping("/render")
    public ResponseEntity<?> renderLabel(@RequestBody LabelRenderRequest request) {
        if (request == null) {
            return ResponseEntity.ok(new ResponseDto("Invalid request", STATUS_FAILED, HttpStatus.BAD_REQUEST.toString(), null));
        }

        LabelTemplateEntity record = resolveTemplate(request);
        String script = isBlank(request.getScript()) ? (record != null ? record.getScript() : null) : request.getScript();
        if (isBlank(script)) {
            return ResponseEntity.ok(new ResponseDto("Template script not found", STATUS_FAILED, HttpStatus.NOT_FOUND.toString(), null));
        }

        String pageSize = !isBlank(request.getPageSize()) ? request.getPageSize() : (record != null ? record.getPageSize() : "4x6");
        LabelFormat format = parseFormat(request.getFormat(), record);

        Map<String, Object> model = request.getData() == null ? new HashMap<>() : new HashMap<>(request.getData());
        if (record != null) {
            putIfAbsent(model, "printerDpi", record.getPrinterDpi());
            putIfAbsent(model, "zplDpmm", record.getZplDpmm());
            putIfAbsent(model, "zplWidth", record.getZplWidth());
            putIfAbsent(model, "zplHeight", record.getZplHeight());
        }
        if (request.getWrapDataTypes() == null || request.getWrapDataTypes()) {
            String tempFileName = "label_engine_" + UUID.randomUUID();
            model = wrapModel(model, tempFileName);
        }

        try {
            Path outputDir = Path.of("/tmp/label-engine-output");
            if (LabelFormat.ZPL.equals(format)) {
                Path zpl = renderer.renderZpl(script, model, outputDir);
                String zplContent = Files.readString(zpl, StandardCharsets.UTF_8);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.TEXT_PLAIN);
                headers.set("Content-Disposition", "inline; filename=\"label.zpl\"");
                return new ResponseEntity<>(zplContent, headers, HttpStatus.OK);
            }

            Path pdf = renderer.renderPdf(script, model, pageSize, outputDir);
            byte[] bytes = Files.readAllBytes(pdf);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.set("Content-Disposition", "inline; filename=\"label.pdf\"");
            headers.setContentLength(bytes.length);
            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
        } catch (Exception ex) {
            return ResponseEntity.ok(new ResponseDto("Failed to render label: " + ex.getMessage(), STATUS_FAILED,
                    HttpStatus.INTERNAL_SERVER_ERROR.toString(), null));
        }
    }

    private LabelTemplateEntity resolveTemplate(LabelRenderRequest request) {
        if (request.getTemplateId() != null) {
            LabelTemplateEntity byId = service.getById(request.getTemplateId());
            if (byId != null) {
                return byId;
            }
        }
        if (!isBlank(request.getTemplateCode())) {
            return service.getByCode(request.getTemplateCode());
        }
        return null;
    }

    private LabelFormat parseFormat(String format, LabelTemplateEntity record) {
        if (format == null || format.isBlank()) {
            if (record != null && record.getLabelFormat() != null) {
                return record.getLabelFormat();
            }
            return LabelFormat.PDF;
        }
        try {
            return LabelFormat.valueOf(format.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            if (record != null && record.getLabelFormat() != null) {
                return record.getLabelFormat();
            }
            return LabelFormat.PDF;
        }
    }

    private Map<String, Object> wrapModel(Map<String, Object> input, String tempFileName) {
        Map<String, Object> wrapped = new HashMap<>();
        for (Map.Entry<String, Object> entry : input.entrySet()) {
            wrapped.put(entry.getKey(), wrapValue(entry.getValue(), tempFileName));
        }
        return wrapped;
    }

    private Object wrapValue(Object value, String tempFileName) {
        if (value == null) {
            return null;
        }
        if (value instanceof Map<?, ?> mapValue) {
            Map<String, Object> wrapped = new HashMap<>();
            for (Map.Entry<?, ?> entry : mapValue.entrySet()) {
                String key = entry.getKey() == null ? "" : entry.getKey().toString();
                wrapped.put(key, wrapValue(entry.getValue(), tempFileName));
            }
            return wrapped;
        }
        if (value instanceof List<?> listValue) {
            List<Object> wrappedList = new ArrayList<>();
            for (Object item : listValue) {
                wrappedList.add(wrapValue(item, tempFileName));
            }
            return wrappedList;
        }
        if (value instanceof String || value instanceof Number || value instanceof Boolean) {
            return new TemplateDataTypes(String.valueOf(value), tempFileName);
        }
        return value;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private void putIfAbsent(Map<String, Object> model, String key, Object value) {
        if (value == null) {
            return;
        }
        if (!model.containsKey(key)) {
            model.put(key, value);
        }
    }
}
