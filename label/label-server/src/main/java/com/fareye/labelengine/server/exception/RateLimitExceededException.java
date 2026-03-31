package com.fareye.labelengine.server.exception;

/**
 * Exception thrown when rate limit is exceeded for API calls.
 */
public class RateLimitExceededException extends RuntimeException {

    private final int maxRequests;
    private final long windowMs;

    /**
     * Constructor with rate limit details.
     *
     * @param message the error message
     * @param maxRequests maximum requests allowed
     * @param windowMs time window in milliseconds
     */
    public RateLimitExceededException(String message, int maxRequests, long windowMs) {
        super(message);
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    /**
     * Constructor with message and cause.
     *
     * @param message the error message
     * @param maxRequests maximum requests allowed
     * @param windowMs time window in milliseconds
     * @param cause the root cause exception
     */
    public RateLimitExceededException(String message, int maxRequests, long windowMs, Throwable cause) {
        super(message, cause);
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    public int getMaxRequests() {
        return maxRequests;
    }

    public long getWindowMs() {
        return windowMs;
    }
}
