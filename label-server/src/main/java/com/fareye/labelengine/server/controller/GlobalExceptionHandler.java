package com.fareye.labelengine.server.controller;

import com.fareye.labelengine.server.dto.ResponseDto;
import com.fareye.labelengine.server.exception.InvalidPreviewDimensionException;
import com.fareye.labelengine.server.exception.LabelaryApiException;
import com.fareye.labelengine.server.exception.RateLimitExceededException;
import com.fareye.labelengine.server.exception.TemplateNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Global exception handler for REST controllers.
 * Handles custom exceptions and returns appropriate HTTP responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    private static final String STATUS_FAILED = "Failed";

    /**
     * Handle TemplateNotFoundException - returns 404 Not Found.
     *
     * @param ex the TemplateNotFoundException
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(TemplateNotFoundException.class)
    public ResponseEntity<ResponseDto> handleTemplateNotFound(TemplateNotFoundException ex) {
        logger.warn("Template not found: {}", ex.getMessage());
        ResponseDto response = new ResponseDto(
                ex.getMessage(),
                STATUS_FAILED,
                HttpStatus.NOT_FOUND.toString(),
                null
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * Handle InvalidPreviewDimensionException - returns 400 Bad Request.
     *
     * @param ex the InvalidPreviewDimensionException
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(InvalidPreviewDimensionException.class)
    public ResponseEntity<ResponseDto> handleInvalidDimension(InvalidPreviewDimensionException ex) {
        logger.warn("Invalid preview dimension: {}", ex.getMessage());
        ResponseDto response = new ResponseDto(
                ex.getMessage(),
                STATUS_FAILED,
                HttpStatus.BAD_REQUEST.toString(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Handle RateLimitExceededException - returns 429 Too Many Requests.
     *
     * @param ex the RateLimitExceededException
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<ResponseDto> handleRateLimitExceeded(RateLimitExceededException ex) {
        logger.warn("Rate limit exceeded: {}", ex.getMessage());
        ResponseDto response = new ResponseDto(
                ex.getMessage(),
                STATUS_FAILED,
                String.valueOf(HttpStatus.TOO_MANY_REQUESTS.value()),
                null
        );
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
    }

    /**
     * Handle LabelaryApiException - returns 502 Bad Gateway.
     * Labelary API errors are treated as upstream service failures.
     *
     * @param ex the LabelaryApiException
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(LabelaryApiException.class)
    public ResponseEntity<ResponseDto> handleLabelaryApiError(LabelaryApiException ex) {
        logger.error("Labelary API error (status {}): {}", ex.getStatusCode(), ex.getMessage());
        
        // Create error message with status code details
        String errorMessage = ex.getMessage();
        if (ex.getStatusCode() >= 400 && ex.getStatusCode() < 500) {
            errorMessage = "Invalid ZPL or request format: " + ex.getMessage();
        } else if (ex.getStatusCode() >= 500) {
            errorMessage = "Labelary API service unavailable: " + ex.getMessage();
        }
        
        ResponseDto response = new ResponseDto(
                errorMessage,
                STATUS_FAILED,
                String.valueOf(ex.getStatusCode()),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(response);
    }

    /**
     * Handle general IllegalArgumentException - returns 400 Bad Request.
     * Used for validation errors (invalid DPMM, invalid ZPL format, etc).
     *
     * @param ex the IllegalArgumentException
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseDto> handleIllegalArgument(IllegalArgumentException ex) {
        logger.warn("Invalid argument: {}", ex.getMessage());
        ResponseDto response = new ResponseDto(
                ex.getMessage(),
                STATUS_FAILED,
                HttpStatus.BAD_REQUEST.toString(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Handle generic exceptions - returns 500 Internal Server Error.
     * Fallback for unexpected errors.
     *
     * @param ex the Exception
     * @return ResponseEntity with error details
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> handleGenericException(Exception ex) {
        logger.error("Unexpected error: ", ex);
        ResponseDto response = new ResponseDto(
                "An unexpected error occurred: " + ex.getMessage(),
                STATUS_FAILED,
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                null
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
