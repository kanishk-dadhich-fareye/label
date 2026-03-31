package com.fareye.labelengine.server.dto;

/**
 * DTO for ZPL label preview generation request.
 * Allows optional overrides of DPMM and dimensions from template defaults.
 */
public class ZplPreviewRequest {
    
    /**
     * Optional DPMM override (6, 8, 12, or 24).
     * If not provided, template's zplDpmm is used.
     */
    private Integer dpmm;
    
    /**
     * Optional width override in inches.
     * If not provided, template's zplWidth is used.
     * Max: 15 inches
     */
    private Double width;
    
    /**
     * Optional height override in inches.
     * If not provided, template's zplHeight is used.
     * Max: 15 inches
     */
    private Double height;

    public ZplPreviewRequest() {
    }

    public ZplPreviewRequest(Integer dpmm, Double width, Double height) {
        this.dpmm = dpmm;
        this.width = width;
        this.height = height;
    }

    public Integer getDpmm() {
        return dpmm;
    }

    public void setDpmm(Integer dpmm) {
        this.dpmm = dpmm;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "ZplPreviewRequest{" +
                "dpmm=" + dpmm +
                ", width=" + width +
                ", height=" + height +
                '}';
    }
}
