package com.fareye.labelengine.server.service;

import com.fareye.labelengine.core.LabelEngine;
import com.fareye.labelengine.core.LabelTemplateMapBuilder;
import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.enumerator.TemplateStatus;
import com.fareye.labelengine.model.LabelTemplate;
import com.fareye.labelengine.server.dto.LabelTemplateActivationDto;
import com.fareye.labelengine.server.dto.LabelTemplatePageDto;
import com.fareye.labelengine.server.dto.LabelTemplateRequestDto;
import com.fareye.labelengine.server.dto.LabelTemplateResponseDto;
import com.fareye.labelengine.server.dto.LabelTemplateStatusRequestDto;
import com.fareye.labelengine.server.dto.PartyMasterDto;
import com.fareye.labelengine.server.persistence.LabelTemplateEntity;
import com.fareye.labelengine.server.persistence.LabelTemplateRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class LabelTemplateService {

    private static final String DEFAULT_PAGE_SIZE = "4x6";
    private static final Logger logger = Logger.getLogger(LabelTemplateService.class.getName());

    private final LabelTemplateRepository repository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final LabelEngine labelEngine = new LabelEngine();
    private final LabelTemplateMapBuilder mapBuilder = new LabelTemplateMapBuilder();

    public LabelTemplateService(LabelTemplateRepository repository) {
        this.repository = repository;
    }

    public LabelTemplatePageDto listTemplates(String searchText, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.DESC, "id"));
        Page<LabelTemplateEntity> page;
        if (isBlank(searchText)) {
            page = repository.findAll(pageable);
        } else {
            page = repository.findByTemplateNameContainingIgnoreCase(searchText.trim(), pageable);
        }
        List<LabelTemplateResponseDto> content = page.getContent().stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());

        LabelTemplatePageDto dto = new LabelTemplatePageDto();
        dto.setContent(content);
        dto.setNumber(page.getNumber());
        dto.setSize(page.getSize());
        dto.setNumberOfElements(page.getNumberOfElements());
        dto.setTotalElements(page.getTotalElements());
        dto.setTotalPages(page.getTotalPages());
        return dto;
    }

    public boolean templateCodeExists(String templateCode) {
        return !isBlank(templateCode) && repository.existsByTemplateCode(templateCode);
    }

    public LabelTemplateEntity createTemplate(LabelTemplateStatusRequestDto request) {
        logger.info("Creating new label template with code: " + request.getTemplateCode() + ", printerDpi: " + request.getPrinterDpi());
        LabelTemplateEntity entity = new LabelTemplateEntity();
        entity.setTemplateName(request.getTemplateName());
        entity.setTemplateCode(request.getTemplateCode());
        entity.setPageSize(isBlank(request.getPageSize()) ? DEFAULT_PAGE_SIZE : request.getPageSize());
        entity.setStatus(TemplateStatus.DRAFT);
        entity.setLabelFormat(LabelFormat.PDF);
        applyOptionalFields(entity, request);
        LabelTemplateEntity saved = repository.save(entity);
        logger.info("Created label template with id: " + saved.getId());
        return saved;
    }

    public LabelTemplateEntity updateTemplate(LabelTemplateStatusRequestDto request) {
        if (request.getTemplateId() == null) {
            return null;
        }
        logger.info("Updating label template with id: " + request.getTemplateId() + ", printerDpi: " + request.getPrinterDpi());
        Optional<LabelTemplateEntity> existingOpt = repository.findById(request.getTemplateId());
        if (existingOpt.isEmpty()) {
            return null;
        }
        LabelTemplateEntity existing = existingOpt.get();
        if (!isBlank(request.getTemplateName())) {
            existing.setTemplateName(request.getTemplateName());
        }
        if (!isBlank(request.getPageSize())) {
            existing.setPageSize(request.getPageSize());
        }
        applyOptionalFields(existing, request);
        LabelTemplateEntity saved = repository.save(existing);
        logger.info("Updated label template with id: " + saved.getId());
        return saved;
    }

    public LabelTemplateEntity saveScript(LabelTemplateRequestDto request) {
        if (request.getTemplateId() == null) {
            return null;
        }
        Optional<LabelTemplateEntity> existingOpt = repository.findById(request.getTemplateId());
        if (existingOpt.isEmpty()) {
            return null;
        }
        LabelTemplateEntity existing = existingOpt.get();
        existing.setScript(request.getScript());
        existing.setStatus(TemplateStatus.INPROGRESS);
        return repository.save(existing);
    }

    public LabelTemplateEntity activate(LabelTemplateActivationDto request) {
        if (request.getTemplateId() == null) {
            return null;
        }
        Optional<LabelTemplateEntity> existingOpt = repository.findById(request.getTemplateId());
        if (existingOpt.isEmpty()) {
            return null;
        }
        LabelTemplateEntity existing = existingOpt.get();
        existing.setStatus(request.getIsActive() ? TemplateStatus.ACTIVE : TemplateStatus.INACTIVE);
        return repository.save(existing);
    }

    public LabelTemplateEntity delete(Long templateId) {
        if (templateId == null) {
            return null;
        }
        Optional<LabelTemplateEntity> existingOpt = repository.findById(templateId);
        if (existingOpt.isEmpty()) {
            return null;
        }
        LabelTemplateEntity entity = existingOpt.get();
        repository.delete(entity);
        return entity;
    }

    public void mapTemplateParties(String templateCode, List<String> partyCodes) {
        if (isBlank(templateCode)) {
            return;
        }
        Optional<LabelTemplateEntity> existingOpt = repository.findByTemplateCode(templateCode);
        if (existingOpt.isEmpty()) {
            return;
        }
        LabelTemplateEntity entity = existingOpt.get();
        String mapped = partyCodes == null || partyCodes.isEmpty() ? "" : String.join(",", partyCodes);
        entity.setPartyCode(mapped);
        repository.save(entity);
    }

    public Map<String, String> getTemplatePartyMapping() {
        Map<String, String> mapping = new HashMap<>();
        for (LabelTemplateEntity entity : repository.findAll()) {
            mapping.put(entity.getTemplateCode(), entity.getPartyCode() == null ? "" : entity.getPartyCode());
        }
        return mapping;
    }

    public LabelTemplateEntity getById(Long templateId) {
        if (templateId == null) {
            return null;
        }
        return repository.findById(templateId).orElse(null);
    }

    public LabelTemplateEntity getByCode(String templateCode) {
        if (isBlank(templateCode)) {
            return null;
        }
        return repository.findByTemplateCode(templateCode).orElse(null);
    }

    public List<PartyMasterDto> getAllPartyMasters() {
        List<PartyMasterDto> list = new ArrayList<>();
        list.add(new PartyMasterDto("PARTY_1"));
        list.add(new PartyMasterDto("PARTY_2"));
        list.add(new PartyMasterDto("PARTY_3"));
        return list;
    }

    public LabelTemplateResponseDto toResponseDto(LabelTemplateEntity entity) {
        if (entity == null) {
            return null;
        }
        LabelTemplateResponseDto dto = new LabelTemplateResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getTemplateName());
        dto.setTemplateCode(entity.getTemplateCode());
        dto.setPartyCode(entity.getPartyCode());
        dto.setPageSize(entity.getPageSize());
        dto.setScript(entity.getScript());
        dto.setStatus(entity.getStatus());
        dto.setLabelFormat(entity.getLabelFormat() == null ? null : entity.getLabelFormat().name());
        dto.setZplDpmm(entity.getZplDpmm());
        dto.setZplWidth(entity.getZplWidth());
        dto.setZplHeight(entity.getZplHeight());
        dto.setPrinterDpi(entity.getPrinterDpi());
        dto.setCreatedAt(formatDate(entity.getCreatedAt()));
        dto.setLastModifiedAt(formatDate(entity.getLastModifiedAt()));
        return dto;
    }

    public LabelTemplate toModel(LabelTemplateEntity entity) {
        if (entity == null) {
            return null;
        }
        return LabelTemplate.builder()
                .name(entity.getTemplateName())
                .code(entity.getTemplateCode())
                .script(entity.getScript())
                .status(entity.getStatus())
                .pageSize(entity.getPageSize())
                .backgroundImage(entity.getBackgroundImage())
                .labelType(entity.getLabelType())
                .isDefaultConfig(entity.getIsDefaultConfig())
                .serviceType(entity.getServiceType())
                .hubCode(entity.getHubCode())
                .businessUnit(entity.getBusinessUnit())
                .labelFormat(entity.getLabelFormat())
                .zplDpmm(entity.getZplDpmm())
                .zplWidth(entity.getZplWidth())
                .zplHeight(entity.getZplHeight())
                .printerDpi(entity.getPrinterDpi())
                .build();
    }

    public LabelTemplateEntity selectTemplate(LabelTypeEnum labelType, String partyCode, String serviceType, String hubCode, String businessUnit, Integer printerDpi, LabelFormat requestedFormat) {
        logger.info("Selecting template for labelType: " + labelType + ", partyCode: " + partyCode + ", serviceType: " + serviceType + ", hubCode: " + hubCode + ", businessUnit: " + businessUnit + ", printerDpi: " + printerDpi + ", format: " + requestedFormat);
        List<LabelTemplateEntity> allEntities = repository.findAll().stream()
                .filter(entity -> TemplateStatus.ACTIVE.equals(entity.getStatus()))
                .toList();
        List<LabelTemplate> models = allEntities.stream()
                .map(this::toModel)
                .collect(Collectors.toList());
        Map<String, List<String>> templatePartyMap = getTemplatePartyMapping().entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue() == null || entry.getValue().isEmpty() ?
                                List.of() : Arrays.asList(entry.getValue().split(","))
                ));
        var templateMap = mapBuilder.createLabelTemplateEntityMap(models, templatePartyMap);
        LabelTemplate selected = labelEngine.selectTemplate(labelType, partyCode, serviceType, hubCode, businessUnit, printerDpi, requestedFormat, templateMap);
        if (selected == null) {
            logger.info("No template selected");
            return null;
        }
        logger.info("Selected template: " + selected.getCode());
        return allEntities.stream()
                .filter(entity -> selected.getCode().equals(entity.getTemplateCode()))
                .findFirst()
                .orElse(null);
    }

    private void applyOptionalFields(LabelTemplateEntity entity, LabelTemplateStatusRequestDto request) {
        if (!isBlank(request.getLabelFormat())) {
            entity.setLabelFormat(LabelFormat.fromString(request.getLabelFormat()));
        }
        if (!isBlank(request.getLabelType())) {
            entity.setLabelType(LabelTypeEnum.fromString(request.getLabelType()));
        }
        if (request.getZplDpmm() != null) {
            entity.setZplDpmm(request.getZplDpmm());
        }
        if (request.getZplWidth() != null) {
            entity.setZplWidth(request.getZplWidth());
        }
        if (request.getZplHeight() != null) {
            entity.setZplHeight(request.getZplHeight());
        }
        if (request.getPrinterDpi() != null) {
            entity.setPrinterDpi(request.getPrinterDpi());
            if (request.getZplDpmm() == null) {
                entity.setZplDpmm(convertDpiToDpmm(request.getPrinterDpi()));
            }
        }
        if (!isBlank(request.getBackgroundImage())) {
            entity.setBackgroundImage(request.getBackgroundImage());
        }
        if (request.getIsDefaultConfig() != null) {
            entity.setIsDefaultConfig(request.getIsDefaultConfig());
        }
        if (!isBlank(request.getServiceType())) {
            entity.setServiceType(request.getServiceType());
        }
        if (!isBlank(request.getHubCode())) {
            entity.setHubCode(request.getHubCode());
        }
        if (!isBlank(request.getBusinessUnit())) {
            entity.setBusinessUnit(request.getBusinessUnit());
        }
    }

    private String formatDate(LocalDateTime value) {
        if (value == null) {
            return null;
        }
        return value.format(formatter);
    }

    private Integer convertDpiToDpmm(Integer dpi) {
        if (dpi == null) {
            return null;
        }
        double dpmm = dpi / 25.4;
        return (int) Math.round(dpmm);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
