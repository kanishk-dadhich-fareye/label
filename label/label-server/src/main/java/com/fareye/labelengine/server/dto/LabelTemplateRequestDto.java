package com.fareye.labelengine.server.dto;

public class LabelTemplateRequestDto {
    private Long templateId;
    private String script;

    public LabelTemplateRequestDto() {
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }
}
