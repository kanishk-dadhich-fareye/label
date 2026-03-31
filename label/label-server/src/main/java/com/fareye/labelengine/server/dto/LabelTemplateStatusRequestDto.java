package com.fareye.labelengine.server.dto;

import com.fareye.labelengine.enumerator.TemplateStatus;

public class LabelTemplateStatusRequestDto {
    private Long templateId;
    private String templateName;
    private String templateCode;
    private TemplateStatus templateStatus;
    private String script;
    private String pageSize;
    private String labelFormat;
    private String labelType;
    private Integer zplDpmm;
    private Double zplWidth;
    private Double zplHeight;
    private Integer printerDpi;
    private String backgroundImage;
    private Boolean isDefaultConfig;
    private String serviceType;
    private String hubCode;
    private String businessUnit;

    public LabelTemplateStatusRequestDto() {
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
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

    public TemplateStatus getTemplateStatus() {
        return templateStatus;
    }

    public void setTemplateStatus(TemplateStatus templateStatus) {
        this.templateStatus = templateStatus;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public String getLabelFormat() {
        return labelFormat;
    }

    public void setLabelFormat(String labelFormat) {
        this.labelFormat = labelFormat;
    }

    public String getLabelType() {
        return labelType;
    }

    public void setLabelType(String labelType) {
        this.labelType = labelType;
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

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
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
}
