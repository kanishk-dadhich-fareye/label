package com.fareye.labelengine.server.dto;

import java.util.Map;

public class LabelRenderRequest {
    private Long templateId;
    private String templateCode;
    private String script;
    private String pageSize;
    private String format;
    private Map<String, Object> data;
    private Boolean wrapDataTypes;

    public LabelRenderRequest() {
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
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

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public Boolean getWrapDataTypes() {
        return wrapDataTypes;
    }

    public void setWrapDataTypes(Boolean wrapDataTypes) {
        this.wrapDataTypes = wrapDataTypes;
    }
}
