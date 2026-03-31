package com.fareye.labelengine.server.controller;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.TemplateStatus;
import com.fareye.labelengine.server.dto.LabelTemplateActivationDto;
import com.fareye.labelengine.server.dto.LabelTemplatePageDto;
import com.fareye.labelengine.server.dto.LabelTemplateRequestDto;
import com.fareye.labelengine.server.dto.LabelTemplateResponseDto;
import com.fareye.labelengine.server.dto.LabelTemplateStatusRequestDto;
import com.fareye.labelengine.server.dto.PartyMasterDto;
import com.fareye.labelengine.server.dto.ResponseDto;
import com.fareye.labelengine.server.dto.ZplPreviewRequest;
import com.fareye.labelengine.server.persistence.LabelTemplateEntity;
import com.fareye.labelengine.server.service.LabelTemplateService;
import com.fareye.labelengine.server.service.ZplPreviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/app/rest/label_generation")
@CrossOrigin(origins = "*")
public class LabelTemplateController {
    private static final String STATUS_SUCCESS = "Success";
    private static final String STATUS_FAILED = "Failed";

    private final LabelTemplateService service;
    private final ZplPreviewService zplPreviewService;

    public LabelTemplateController(LabelTemplateService service, ZplPreviewService zplPreviewService) {
        this.service = service;
        this.zplPreviewService = zplPreviewService;
    }

    @GetMapping("/get/labelTemplate")
    public ResponseEntity<ResponseDto> getLabelTemplateList(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("recordPerPage") int recordPerPage,
            @RequestParam(value = "selectedKeys", required = false) String selectedKeys) {
        int safePageNumber = Math.max(pageNumber, 0);
        int safePageSize = recordPerPage <= 0 ? 10 : recordPerPage;
        String normalizedKeys = normalizeSearch(selectedKeys);
        LabelTemplatePageDto pageDto = service.listTemplates(normalizedKeys, safePageNumber, safePageSize);
        ResponseDto response = new ResponseDto("Label templates fetched", STATUS_SUCCESS, HttpStatus.OK.toString(), pageDto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addOrUpdate/labelTemplate")
    public ResponseEntity<ResponseDto> addOrUpdateLabelTemplate(@RequestBody LabelTemplateStatusRequestDto request) {
        if (request == null) {
            return ResponseEntity.ok(new ResponseDto("Invalid request", STATUS_FAILED, HttpStatus.BAD_REQUEST.toString(), null));
        }
        Long templateId = request.getTemplateId();
        if (templateId == null || templateId == 0L) {
            if (request.getTemplateStatus() != null && request.getTemplateStatus() != TemplateStatus.DRAFT) {
                return ResponseEntity.ok(new ResponseDto("Only DRAFT templates can be created", STATUS_FAILED,
                        HttpStatus.FORBIDDEN.toString(), null));
            }
            if (isBlank(request.getTemplateCode()) || isBlank(request.getTemplateName())) {
                return ResponseEntity.ok(new ResponseDto("Template code and name are required", STATUS_FAILED,
                        HttpStatus.BAD_REQUEST.toString(), null));
            }
            if (service.templateCodeExists(request.getTemplateCode())) {
                return ResponseEntity.ok(new ResponseDto("Label Template code already exists", STATUS_FAILED,
                        HttpStatus.FORBIDDEN.toString(), null));
            }
            LabelTemplateEntity record = service.createTemplate(request);
            LabelTemplateResponseDto dto = service.toResponseDto(record);
            return ResponseEntity.ok(new ResponseDto("Successfully created", STATUS_SUCCESS, HttpStatus.OK.toString(), dto));
        }

        LabelTemplateEntity updated = service.updateTemplate(request);
        if (updated == null) {
            return ResponseEntity.ok(new ResponseDto("Label Template not found", STATUS_FAILED,
                    HttpStatus.NOT_FOUND.toString(), null));
        }
        return ResponseEntity.ok(new ResponseDto("Successfully updated", STATUS_SUCCESS, HttpStatus.OK.toString(), service.toResponseDto(updated)));
    }

    @PostMapping("/save/labelTemplate")
    public ResponseEntity<ResponseDto> saveLabelTemplateScript(@RequestBody LabelTemplateRequestDto request) {
        if (request == null || request.getTemplateId() == null) {
            return ResponseEntity.ok(new ResponseDto("Template id is required", STATUS_FAILED, HttpStatus.BAD_REQUEST.toString(), null));
        }
        LabelTemplateEntity existing = service.getById(request.getTemplateId());
        if (existing == null) {
            return ResponseEntity.ok(new ResponseDto("Label Template not found", STATUS_FAILED, HttpStatus.NOT_FOUND.toString(), null));
        }
        if (!isScriptValid(existing.getLabelFormat(), request.getScript())) {
            String message = existing.getLabelFormat() == LabelFormat.ZPL ? "Invalid ZPL. It should start with ^XA and end with ^XZ."
                    : "Invalid HTML. Please provide a valid HTML template for PDF labels.";
            return ResponseEntity.ok(new ResponseDto(message, STATUS_FAILED, HttpStatus.BAD_REQUEST.toString(), null));
        }
        LabelTemplateEntity updated = service.saveScript(request);
        if (updated == null) {
            return ResponseEntity.ok(new ResponseDto("Label Template not found", STATUS_FAILED, HttpStatus.NOT_FOUND.toString(), null));
        }
        return ResponseEntity.ok(new ResponseDto("Successfully saved", STATUS_SUCCESS, HttpStatus.OK.toString(), null));
    }

    @PostMapping("/activate/labelTemplate")
    public ResponseEntity<ResponseDto> activateDeactivateLabelTemplate(@RequestBody LabelTemplateActivationDto request) {
        if (request == null || request.getTemplateId() == null) {
            return ResponseEntity.ok(new ResponseDto("Template id is required", STATUS_FAILED, HttpStatus.BAD_REQUEST.toString(), null));
        }
        LabelTemplateEntity updated = service.activate(request);
        if (updated == null) {
            return ResponseEntity.ok(new ResponseDto("Label Template not found", STATUS_FAILED, HttpStatus.NOT_FOUND.toString(), null));
        }
        return ResponseEntity.ok(new ResponseDto("Status successfully updated", STATUS_SUCCESS, HttpStatus.OK.toString(), null));
    }

    @PostMapping("/delete/label_template")
    public ResponseEntity<ResponseDto> deleteLabelTemplate(@RequestParam("labelTemplateId") Long labelTemplateId) {
        LabelTemplateEntity removed = service.delete(labelTemplateId);
        if (removed == null) {
            return ResponseEntity.ok(new ResponseDto("Label Template not found", STATUS_FAILED, HttpStatus.NOT_FOUND.toString(), null));
        }
        return ResponseEntity.ok(new ResponseDto("Successfully deleted", STATUS_SUCCESS, HttpStatus.OK.toString(), null));
    }

    /**
     * Generate a preview of a ZPL label using the Labelary API.
     * 
     * @param templateId the ID of the label template
     * @param request optional overrides for DPMM, width, and height
     * @return binary response containing the rendered label (PNG or PDF)
     */
    @PostMapping("/preview/labelTemplate/{id}")
    public ResponseEntity<byte[]> previewLabelTemplate(
            @PathVariable("id") Long templateId,
            @RequestBody(required = false) ZplPreviewRequest request) {
        byte[] previewImage = zplPreviewService.generatePreview(templateId, request);
        
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(previewImage);
    }

    @PostMapping("/save/mapping/labelTemplateParty")
    public ResponseEntity<ResponseDto> mapLabelTemplateParty(@RequestParam("templateCode") String templateCode,
                                                             @RequestParam(value = "partyCodes", required = false) String partyCodes) {
        List<String> codes = new ArrayList<>();
        if (!isBlank(partyCodes)) {
            codes = Arrays.stream(partyCodes.split(","))
                    .map(String::trim)
                    .filter(value -> !value.isEmpty())
                    .collect(Collectors.toList());
        }
        service.mapTemplateParties(templateCode, codes);
        return ResponseEntity.ok(new ResponseDto("Successfully updated", STATUS_SUCCESS, HttpStatus.OK.toString(), null));
    }

    @GetMapping("/fetch/labelPartyMapping")
    public ResponseEntity<ResponseDto> fetchLabelPartyMapping() {
        Map<String, String> mapping = service.getTemplatePartyMapping();
        return ResponseEntity.ok(new ResponseDto("Mapping fetched", STATUS_SUCCESS, HttpStatus.OK.toString(), mapping));
    }

    @GetMapping("/getAll_party_master")
    public ResponseEntity<ResponseDto> getAllPartyMaster() {
        List<PartyMasterDto> parties = service.getAllPartyMasters();
        return ResponseEntity.ok(new ResponseDto("Party masters fetched", STATUS_SUCCESS, HttpStatus.OK.toString(), parties));
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String normalizeSearch(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        if (trimmed.isEmpty()) {
            return "";
        }
        if ("undefined".equalsIgnoreCase(trimmed) || "null".equalsIgnoreCase(trimmed)) {
            return "";
        }
        return trimmed;
    }

    private boolean isScriptValid(LabelFormat format, String script) {
        if (script == null || script.trim().isEmpty()) {
            return false;
        }
        if (format == null || format == LabelFormat.PDF) {
            return isProbablyHtml(script);
        }
        if (format == LabelFormat.ZPL) {
            return isProbablyZpl(script);
        }
        return true;
    }

    private boolean isProbablyHtml(String value) {
        return value != null && value.matches("(?s).*<\\s*/?\\s*\\w+[\\s\\S]*?>.*");
    }

    private boolean isProbablyZpl(String value) {
        if (value == null) {
            return false;
        }
        String trimmed = value.trim().toUpperCase();
        return trimmed.startsWith("^XA") && trimmed.endsWith("^XZ");
    }
}
