package com.fareye.labelengine.server.exception;

/**
 * Exception thrown when a label template is not found by ID or code.
 */
public class TemplateNotFoundException extends RuntimeException {
    
    private final Long templateId;
    private final String templateCode;

    /**
     * Constructor with template ID.
     *
     * @param templateId the template ID that was not found
     */
    public TemplateNotFoundException(Long templateId) {
        super("Label template not found with ID: " + templateId);
        this.templateId = templateId;
        this.templateCode = null;
    }

    /**
     * Constructor with template code.
     *
     * @param templateCode the template code that was not found
     */
    public TemplateNotFoundException(String templateCode) {
        super("Label template not found with code: " + templateCode);
        this.templateId = null;
        this.templateCode = templateCode;
    }

    /**
     * Constructor with custom message.
     *
     * @param message the custom error message
     * @param templateId the template ID
     */
    public TemplateNotFoundException(String message, Long templateId) {
        super(message);
        this.templateId = templateId;
        this.templateCode = null;
    }

    public Long getTemplateId() {
        return templateId;
    }

    public String getTemplateCode() {
        return templateCode;
    }
}
