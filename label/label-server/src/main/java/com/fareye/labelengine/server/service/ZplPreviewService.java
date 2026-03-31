package com.fareye.labelengine.server.service;

import com.fareye.labelengine.enumerator.DpmmEnum;
import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.server.dto.ZplPreviewRequest;
import com.fareye.labelengine.server.exception.InvalidPreviewDimensionException;
import com.fareye.labelengine.server.exception.LabelaryApiException;
import com.fareye.labelengine.server.exception.RateLimitExceededException;
import com.fareye.labelengine.server.exception.TemplateNotFoundException;
import com.fareye.labelengine.server.persistence.LabelTemplateEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service for generating ZPL label previews using the Custom ZPL Viewer API.
 * 
 * Uses the custom-zpl-viewer service running on port 3000:
 * POST http://localhost:3000/api/render
 * 
 * Request body:
 * {
 *   "zpl": "ZPL script",
 *   "density": 8 (DPMM: 6, 8, 12, or 24),
 *   "width": 4.0 (inches),
 *   "height": 6.0 (inches),
 *   "unit": "inches",
 *   "format": "png" (or "pdf")
 * }
 * 
 * Response:
 * {
 *   "image": "data:image/png;base64,..."
 * }
 */
@Service
public class ZplPreviewService {
    
    private static final Logger logger = LoggerFactory.getLogger(ZplPreviewService.class);
    
    // Custom ZPL Viewer API endpoint
    private static final String ZPL_VIEWER_BASE_URL = "http://localhost:3000";
    private static final String ZPL_VIEWER_RENDER_API = "/api/render";
    
    private static final double MAX_LABEL_DIMENSION_INCHES = 15.0;
    private static final String ZPL_START_MARKER = "^XA";
    private static final String ZPL_END_MARKER = "^XZ";
    
    // Rate limiting: max 60 requests per minute
    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final long RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
    
    private final LabelTemplateService labelTemplateService;
    private final WebClient webClient;
    
    // Rate limiting storage - in production, use Redis or distributed cache
    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> windowStartTimes = new ConcurrentHashMap<>();

    public ZplPreviewService(LabelTemplateService labelTemplateService, WebClient webClient) {
        this.labelTemplateService = labelTemplateService;
        this.webClient = webClient;
    }

    /**
     * Generate a preview of a ZPL label using the Labelary API.
     *
     * @param templateId the ID of the label template
     * @param overrides optional overrides for DPMM, width, and height
     * @return byte array containing the rendered label (PNG or PDF)
     * @throws TemplateNotFoundException if template is not found
     * @throws InvalidPreviewDimensionException if dimensions exceed maximum
     * @throws LabelaryApiException if Labelary API call fails
     */
    public byte[] generatePreview(Long templateId, ZplPreviewRequest overrides) {
        logger.debug("Generating preview for template ID: {}", templateId);

        // Check rate limit before processing
        checkRateLimit();

        // Fetch the template
        LabelTemplateEntity template = labelTemplateService.getById(templateId);
        if (template == null) {
            throw new TemplateNotFoundException(templateId);
        }

        // Validate template is ZPL format
        if (template.getLabelFormat() != LabelFormat.ZPL) {
            throw new IllegalArgumentException(
                    "Preview is only supported for ZPL format templates. Current format: " + template.getLabelFormat()
            );
        }

        // Validate and extract ZPL script
        String zplScript = template.getScript();
        if (zplScript == null || zplScript.trim().isEmpty()) {
            throw new IllegalArgumentException("Template script is empty. Please save a valid ZPL script first.");
        }
        validateZplScript(zplScript);

        // Determine DPMM (use override or template default)
        int dpmm = (overrides != null && overrides.getDpmm() != null)
                ? overrides.getDpmm()
                : template.getZplDpmm();
        validateDpmm(dpmm);

        // Determine width and height (use overrides or template defaults)
        double width = (overrides != null && overrides.getWidth() != null)
                ? overrides.getWidth()
                : template.getZplWidth();
        double height = (overrides != null && overrides.getHeight() != null)
                ? overrides.getHeight()
                : template.getZplHeight();

        // Validate dimensions
        validateDimensions(width, height);

        logger.debug("Preview parameters: DPMM={}, Width={}, Height={}", dpmm, width, height);

        // Call Custom ZPL Viewer API
        return callZplViewerApi(dpmm, width, height, zplScript);
    }

    /**
     * Call the Custom ZPL Viewer API to render the ZPL label.
     *
     * @param dpmm dots per millimeter (6, 8, 12, or 24) - density parameter
     * @param width label width in inches
     * @param height label height in inches
     * @param zplScript the ZPL script to render
     * @return byte array containing the rendered label (PNG binary)
     * @throws LabelaryApiException if API call fails
     */
    private byte[] callZplViewerApi(int dpmm, double width, double height, String zplScript) {
        try {
            String apiUrl = ZPL_VIEWER_BASE_URL + ZPL_VIEWER_RENDER_API;
            
            logger.debug("Calling Custom ZPL Viewer API: {}", apiUrl);
            
            // Prepare request body as JSON
            String requestBody = buildRequestBody(zplScript, dpmm, width, height);
            
            // Make the API call and get the response
            ZplViewerResponse response = webClient.post()
                    .uri(apiUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(ZplViewerResponse.class)
                    .onErrorMap(WebClientResponseException.class, e -> {
                        String errorMsg = "ZPL Viewer API returned status " + e.getRawStatusCode();
                        try {
                            String body = e.getResponseBodyAsString();
                            if (body != null && !body.isEmpty()) {
                                errorMsg += ": " + body;
                                return new LabelaryApiException(errorMsg, e.getRawStatusCode(), body);
                            }
                        } catch (Exception ignored) {
                        }
                        return new LabelaryApiException(errorMsg, e.getRawStatusCode());
                    })
                    .onErrorMap(Exception.class, e -> {
                        logger.error("Failed to call Custom ZPL Viewer API", e);
                        return new LabelaryApiException("Failed to call Custom ZPL Viewer API: " + e.getMessage(), 500, null, e);
                    })
                    .block();

            if (response == null || response.getImage() == null || response.getImage().isEmpty()) {
                throw new LabelaryApiException("ZPL Viewer API returned empty response", 500);
            }

            // Extract base64 image data from data URL
            String imageDataUrl = response.getImage();
            byte[] imageBytes = extractBase64Bytes(imageDataUrl);
            
            logger.debug("Successfully retrieved preview from Custom ZPL Viewer API, size: {} bytes", imageBytes.length);
            return imageBytes;

        } catch (Exception e) {
            if (e instanceof LabelaryApiException) {
                throw (LabelaryApiException) e;
            }
            throw new LabelaryApiException("Failed to render ZPL preview: " + e.getMessage(), 500, null, e);
        }
    }

    /**
     * Build JSON request body for Custom ZPL Viewer API.
     *
     * @param zpl ZPL script
     * @param density DPMM value (6, 8, 12, 24)
     * @param width label width in inches
     * @param height label height in inches
     * @return JSON request body string
     */
    private String buildRequestBody(String zpl, int density, double width, double height) {
        return String.format(
            "{\"zpl\":%s,\"density\":%d,\"width\":%.1f,\"height\":%.1f,\"unit\":\"inches\",\"format\":\"png\"}",
            escapeJsonString(zpl),
            density,
            width,
            height
        );
    }

    /**
     * Escape a string for use in JSON.
     *
     * @param str the string to escape
     * @return escaped JSON string (without outer quotes)
     */
    private String escapeJsonString(String str) {
        return "\"" + str
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
            + "\"";
    }

    /**
     * Extract base64 bytes from data URL.
     *
     * @param dataUrl data URL in format "data:image/png;base64,..."
     * @return decoded byte array
     */
    private byte[] extractBase64Bytes(String dataUrl) {
        if (dataUrl.startsWith("data:image/png;base64,")) {
            String base64Data = dataUrl.substring("data:image/png;base64,".length());
            return Base64.getDecoder().decode(base64Data);
        }
        // If it's plain base64 without data URL prefix
        return Base64.getDecoder().decode(dataUrl);
    }

    /**
     * Simple DTO to deserialize ZPL Viewer API response.
     */
    public static class ZplViewerResponse {
        private String image;
        private String error;

        public ZplViewerResponse() {
        }

        public ZplViewerResponse(String image) {
            this.image = image;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    /**
     * Check rate limit for Labelary API calls.
     * Allows maximum 60 requests per minute.
     *
     * @throws RateLimitExceededException if rate limit exceeded
     */
    private void checkRateLimit() {
        String clientKey = "labelary_api"; // In production, use IP address or user ID
        long currentTime = Instant.now().toEpochMilli();
        
        // Get or create request count for this client
        AtomicInteger requestCount = requestCounts.computeIfAbsent(clientKey, k -> new AtomicInteger(0));
        Long windowStart = windowStartTimes.computeIfAbsent(clientKey, k -> currentTime);
        
        // Check if we're in a new time window
        if (currentTime - windowStart > RATE_LIMIT_WINDOW_MS) {
            // Reset the counter for new window
            requestCount.set(1);
            windowStartTimes.put(clientKey, currentTime);
            logger.debug("Rate limit reset for client: {}", clientKey);
        } else {
            // Increment counter and check limit
            int currentCount = requestCount.incrementAndGet();
            if (currentCount > MAX_REQUESTS_PER_MINUTE) {
                logger.warn("Rate limit exceeded for client: {} - {} requests in current window", 
                           clientKey, currentCount);
                throw new RateLimitExceededException(
                    "Rate limit exceeded. Maximum " + MAX_REQUESTS_PER_MINUTE + " requests per minute allowed.", 
                    MAX_REQUESTS_PER_MINUTE, RATE_LIMIT_WINDOW_MS
                );
            }
        }
        
        logger.debug("Rate limit check passed for client: {} - request count: {}", 
                    clientKey, requestCount.get());
    }

    /**
     * Validate that DPMM value is supported (6, 8, 12, or 24).
     *
     * @param dpmm the DPMM value to validate
     * @throws IllegalArgumentException if DPMM is not supported
     */
    private void validateDpmm(int dpmm) {
        try {
            DpmmEnum.fromDpmm(dpmm);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid DPMM value: {}", dpmm);
            throw e;
        }
    }

    /**
     * Validate label dimensions do not exceed maximum allowed size (15 inches).
     *
     * @param width label width in inches
     * @param height label height in inches
     * @throws InvalidPreviewDimensionException if dimensions exceed maximum
     */
    private void validateDimensions(double width, double height) {
        if (width <= 0 || height <= 0) {
            throw new InvalidPreviewDimensionException(
                    "Dimensions must be positive values",
                    width, height
            );
        }

        if (width > MAX_LABEL_DIMENSION_INCHES || height > MAX_LABEL_DIMENSION_INCHES) {
            throw new InvalidPreviewDimensionException(
                    "Label dimensions exceed maximum allowed size of " + MAX_LABEL_DIMENSION_INCHES + " inches",
                    width, height
            );
        }

        logger.debug("Dimensions validated: width={}, height={}", width, height);
    }

    /**
     * Validate that ZPL script has valid format and contains label content.
     * ZPL script must:
     * - Start with ^XA and end with ^XZ
     * - Contain at least one field command (^FD) to generate actual label content
     *
     * @param zplScript the ZPL script to validate
     * @throws IllegalArgumentException if ZPL format is invalid or no labels would be generated
     */
    private void validateZplScript(String zplScript) {
        String trimmed = zplScript.trim();

        if (!trimmed.startsWith(ZPL_START_MARKER)) {
            throw new IllegalArgumentException(
                    "Invalid ZPL script: must start with " + ZPL_START_MARKER
            );
        }

        if (!trimmed.endsWith(ZPL_END_MARKER)) {
            throw new IllegalArgumentException(
                    "Invalid ZPL script: must end with " + ZPL_END_MARKER
            );
        }

        // Check for actual label content - must have at least one ^FD command
        if (!trimmed.contains("^FD")) {
            throw new IllegalArgumentException(
                    "Invalid ZPL script: must contain at least one field command (^FD) to generate label content. " +
                    "Example: ^XA^FO50,50^A0N,28,28^FDHello World^FS^XZ"
            );
        }

        // Additional validation: ensure the script has proper structure
        // Count ^XA and ^XZ to ensure they match (basic balance check)
        long startCount = trimmed.chars().filter(ch -> ch == '^').count() - 
                         trimmed.replace("^XA", "").length() / 2;
        long endCount = trimmed.chars().filter(ch -> ch == '^').count() - 
                       trimmed.replace("^XZ", "").length() / 2;
        
        if (startCount != endCount) {
            throw new IllegalArgumentException(
                    "Invalid ZPL script: mismatched ^XA and ^XZ markers. Each ^XA must have a corresponding ^XZ."
            );
        }

        logger.debug("ZPL script format validated - contains label content");
    }
}
