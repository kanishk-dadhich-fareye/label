package com.fareye.labelengine.server.exception;

/**
 * Exception thrown when Labelary API call fails or returns an error.
 * Wraps HTTP 4xx and 5xx errors from Labelary API.
 */
public class LabelaryApiException extends RuntimeException {
    
    private final int statusCode;
    private final String apiResponse;

    /**
     * Constructor with message and status code.
     *
     * @param message the error message
     * @param statusCode the HTTP status code from Labelary API
     */
    public LabelaryApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.apiResponse = null;
    }

    /**
     * Constructor with message, status code, and API response body.
     *
     * @param message the error message
     * @param statusCode the HTTP status code from Labelary API
     * @param apiResponse the response body from Labelary API
     */
    public LabelaryApiException(String message, int statusCode, String apiResponse) {
        super(message);
        this.statusCode = statusCode;
        this.apiResponse = apiResponse;
    }

    /**
     * Constructor with message, status code, API response, and cause.
     *
     * @param message the error message
     * @param statusCode the HTTP status code from Labelary API
     * @param apiResponse the response body from Labelary API
     * @param cause the root cause exception
     */
    public LabelaryApiException(String message, int statusCode, String apiResponse, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
        this.apiResponse = apiResponse;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getApiResponse() {
        return apiResponse;
    }
}
