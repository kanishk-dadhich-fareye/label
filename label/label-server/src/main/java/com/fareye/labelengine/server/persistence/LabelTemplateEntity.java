package com.fareye.labelengine.server.persistence;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.enumerator.TemplateStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "label_template", indexes = {
        @Index(name = "idx_label_template_code", columnList = "code", unique = true)
})
public class LabelTemplateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String templateName;

    @Column(name = "code", nullable = false, unique = true)
    private String templateCode;

    @Column(name = "script", columnDefinition = "TEXT")
    private String script;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TemplateStatus status;

    @Column(name = "page_size")
    private String pageSize;

    @Column(name = "background_image")
    private String backgroundImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "label_type")
    private LabelTypeEnum labelType;

    @Column(name = "is_default_config")
    private Boolean isDefaultConfig;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "hub_code")
    private String hubCode;

    @Column(name = "business_unit")
    private String businessUnit;

    @Enumerated(EnumType.STRING)
    @Column(name = "label_format")
    private LabelFormat labelFormat;

    @Column(name = "zpl_dpmm")
    private Integer zplDpmm;

    @Column(name = "zpl_width")
    private Double zplWidth;

    @Column(name = "zpl_height")
    private Double zplHeight;

    @Column(name = "printer_dpi")
    private Integer printerDpi;

    @Column(name = "party_code")
    private String partyCode;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "last_modified_at")
    private LocalDateTime lastModifiedAt;

    public LabelTemplateEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateCode() {
        return templateCode;
    }

    public void setTemplateCode(String templateCode) {
        this.templateCode = templateCode;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public TemplateStatus getStatus() {
        return status;
    }

    public void setStatus(TemplateStatus status) {
        this.status = status;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public LabelTypeEnum getLabelType() {
        return labelType;
    }

    public void setLabelType(LabelTypeEnum labelType) {
        this.labelType = labelType;
    }

    public Boolean getIsDefaultConfig() {
        return isDefaultConfig;
    }

    public void setIsDefaultConfig(Boolean defaultConfig) {
        isDefaultConfig = defaultConfig;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getHubCode() {
        return hubCode;
    }

    public void setHubCode(String hubCode) {
        this.hubCode = hubCode;
    }

    public String getBusinessUnit() {
        return businessUnit;
    }

    public void setBusinessUnit(String businessUnit) {
        this.businessUnit = businessUnit;
    }

    public LabelFormat getLabelFormat() {
        return labelFormat;
    }

    public void setLabelFormat(LabelFormat labelFormat) {
        this.labelFormat = labelFormat;
    }

    public Integer getZplDpmm() {
        return zplDpmm;
    }

    public void setZplDpmm(Integer zplDpmm) {
        this.zplDpmm = zplDpmm;
    }

    public Double getZplWidth() {
        return zplWidth;
    }

    public void setZplWidth(Double zplWidth) {
        this.zplWidth = zplWidth;
    }

    public Double getZplHeight() {
        return zplHeight;
    }

    public void setZplHeight(Double zplHeight) {
        this.zplHeight = zplHeight;
    }

    public Integer getPrinterDpi() {
        return printerDpi;
    }

    public void setPrinterDpi(Integer printerDpi) {
        this.printerDpi = printerDpi;
    }

    public String getPartyCode() {
        return partyCode;
    }

    public void setPartyCode(String partyCode) {
        this.partyCode = partyCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(LocalDateTime lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }
}
