package com.fareye.labelengine.server.dto;

public class ResponseDto {
    private String message;
    private String status;
    private String statusCode;
    private Object data;

    public ResponseDto() {
    }

    public ResponseDto(String message, String status, String statusCode, Object data) {
        this.message = message;
        this.status = status;
        this.statusCode = statusCode;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
