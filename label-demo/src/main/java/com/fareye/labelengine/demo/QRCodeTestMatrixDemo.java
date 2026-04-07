package com.fareye.labelengine.demo;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.WriterException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Comprehensive QR code testing utility to compare different configurations.
 * Generates QR codes with varying sizes, error correction levels, and charset usage.
 */
public class QRCodeTestMatrixDemo {

    private static final String OUTPUT_DIR = "/tmp/qr_test_matrix/";
    private static final String DATA = "TEST-QR-1234567890-FAREYE";
    private static final int[] SIZES = {200, 250, 300};
    private static final ErrorCorrectionLevel[] ECC_LEVELS = {
            ErrorCorrectionLevel.L,
            ErrorCorrectionLevel.Q,
            ErrorCorrectionLevel.H
    };
    private static final boolean[] WITH_CHARSET = {true, false};

    public static void main(String[] args) throws Exception {
        // Ensure output directory exists
        new File(OUTPUT_DIR).mkdirs();
        
        int totalGenerated = 0;
        
        // Generate all combinations
        for (int size : SIZES) {
            for (ErrorCorrectionLevel ecc : ECC_LEVELS) {
                for (boolean withCharset : WITH_CHARSET) {
                    String charsetLabel = withCharset ? "utf8" : "nocharset";
                    String filename = String.format(
                            "Qr_%dx%d_%s_%s.png",
                            size, size, ecc.toString(), charsetLabel
                    );
                    
                    String filePath = OUTPUT_DIR + filename;
                    generateQRCode(DATA, size, size, ecc, withCharset, filePath);
                    
                    System.out.println("Generated: " + filePath);
                    totalGenerated++;
                }
            }
        }
        
        System.out.println("\n=== QR TEST MATRIX COMPLETE ===");
        System.out.println("Generated " + totalGenerated + " QR codes in " + OUTPUT_DIR);
        System.out.println("Configurations tested:");
        System.out.println("- Sizes: 200x200, 250x250, 300x300");
        System.out.println("- Error Correction: L, Q, H");
        System.out.println("- Charset: UTF-8, no charset");
    }

    /**
     * Generates a QR code with specified parameters.
     *
     * @param data       Data to encode
     * @param width      Width in pixels
     * @param height     Height in pixels
     * @param eccLevel   Error correction level
     * @param withCharset Whether to use UTF-8 charset
     * @param filePath   Output file path
     * @throws IOException If writing fails
     * @throws WriterException If encoding fails
     */
    private static void generateQRCode(
            String data, 
            int width, 
            int height, 
            ErrorCorrectionLevel eccLevel, 
            boolean withCharset,
            String filePath) throws IOException, WriterException {
        
        // Configure hints
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.ERROR_CORRECTION, eccLevel);
        hints.put(EncodeHintType.MARGIN, 4); // Quiet zone
        
        if (withCharset) {
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        }
        
        // Generate QR code
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        var bitMatrix = qrCodeWriter.encode(
                data, 
                BarcodeFormat.QR_CODE, 
                width, 
                height, 
                hints
        );
        
        // Write to file
        MatrixToImageWriter.writeToFile(
                bitMatrix, 
                "PNG", 
                new File(filePath)
        );
    }
}