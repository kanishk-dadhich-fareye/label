package com.fareye.labelengine.server.exception;

/**
 * Exception thrown when preview dimensions exceed maximum allowed size.
 * Maximum allowed dimensions: 15 inches x 15 inches.
 */
public class InvalidPreviewDimensionException extends RuntimeException {
    
    private final double width;
    private final double height;
    private static final double MAX_DIMENSION_INCHES = 15.0;

    /**
     * Constructor with message and dimensions.
     *
     * @param message the error message
     * @param width the width value (in inches)
     * @param height the height value (in inches)
     */
    public InvalidPreviewDimensionException(String message, double width, double height) {
        super(formatMessage(message, width, height));
        this.width = width;
        this.height = height;
    }

    /**
     * Constructor with message, dimensions, and cause.
     *
     * @param message the error message
     * @param width the width value (in inches)
     * @param height the height value (in inches)
     * @param cause the root cause exception
     */
    public InvalidPreviewDimensionException(String message, double width, double height, Throwable cause) {
        super(formatMessage(message, width, height), cause);
        this.width = width;
        this.height = height;
    }

    private static String formatMessage(String message, double width, double height) {
        return message + " [width=" + width + " inches, height=" + height + " inches, max=" + MAX_DIMENSION_INCHES + " inches]";
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    public static double getMaxDimensionInches() {
        return MAX_DIMENSION_INCHES;
    }
}
