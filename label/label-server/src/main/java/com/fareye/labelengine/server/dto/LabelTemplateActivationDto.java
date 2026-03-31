package com.fareye.labelengine.server.dto;

public class LabelTemplateActivationDto {
    private Long templateId;
    private boolean isActive;

    public LabelTemplateActivationDto() {
    }

    public LabelTemplateActivationDto(Long templateId, boolean isActive) {
        this.templateId = templateId;
        this.isActive = isActive;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }
}
