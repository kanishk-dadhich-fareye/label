package com.fareye.labelengine.server.dto;

import com.fareye.labelengine.enumerator.TemplateStatus;

public class LabelTemplateResponseDto {
    private Long id;
    private String name;
    private String templateCode;
    private String partyCode;
    private String pageSize;
    private String script;
    private TemplateStatus status;
    private String createdAt;
    private String lastModifiedAt;
    private String labelFormat;
    private Integer zplDpmm;
    private Double zplWidth;
    private Double zplHeight;
    private Integer printerDpi;

    public LabelTemplateResponseDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTemplateCode() {
        return templateCode;
    }

    public void setTemplateCode(String templateCode) {
        this.templateCode = templateCode;
    }

    public String getPartyCode() {
        return partyCode;
    }

    public void setPartyCode(String partyCode) {
        this.partyCode = partyCode;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastModifiedAt() {
        return lastModifiedAt;
    }

    public void setLastModifiedAt(String lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }

    public String getLabelFormat() {
        return labelFormat;
    }

    public void setLabelFormat(String labelFormat) {
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
}
