package com.fareye.labelengine.demo;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.WriterException;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Generates QR codes and creates an Excel report with embedded images.
 * Compares QR codes for different data strings, sizes, and error correction levels.
 */
public class QRCodeExcelWithImagesDemo {

    private static final String OUTPUT_DIR = "/tmp/qr_test_matrix/";
    private static final List<String> TEST_DATA = Arrays.asList(
            "TEST-QR-1234567890-FAREYE",
            "https://tracking.company.com/track?shipment=1234567890ABCDE&region=IN&source=label"
    );
    private static final int[] SIZES = {200, 250, 300};
    private static final ErrorCorrectionLevel[] ECC_LEVELS = {
            ErrorCorrectionLevel.L,
            ErrorCorrectionLevel.Q,
            ErrorCorrectionLevel.H
    };
    private static final String CHARSET = "UTF-8";
    private static final int MARGIN = 4;

    public static void main(String[] args) throws Exception {
        // Ensure output directory exists
        new File(OUTPUT_DIR).mkdirs();
        
        // Prepare Excel workbook
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("QR Code Test Results");
        
        // Create header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Data String");
        headerRow.createCell(1).setCellValue("Size (px)");
        headerRow.createCell(2).setCellValue("Error Correction");
        headerRow.createCell(3).setCellValue("Charset");
        headerRow.createCell(4).setCellValue("Margin");
        headerRow.createCell(5).setCellValue("File Path");
        headerRow.createCell(6).setCellValue("File Size (bytes)");
        headerRow.createCell(7).setCellValue("QR Image");
        
        // Set column widths
        sheet.setColumnWidth(0, 30 * 256); // Data String
        sheet.setColumnWidth(1, 15 * 256); // Size
        sheet.setColumnWidth(2, 15 * 256); // Error Correction
        sheet.setColumnWidth(3, 15 * 256); // Charset
        sheet.setColumnWidth(4, 10 * 256); // Margin
        sheet.setColumnWidth(5, 40 * 256); // File Path
        sheet.setColumnWidth(6, 15 * 256); // File Size
        sheet.setColumnWidth(7, 30 * 256); // QR Image
        
        int rowIndex = 1; // Start after header
        
        // Generate QR codes for all combinations
        for (String data : TEST_DATA) {
            for (int size : SIZES) {
                for (ErrorCorrectionLevel ecc : ECC_LEVELS) {
                    String filename = String.format(
                            "Qr_%dx%d_%s_utf8_%d.png",
                            size, size, ecc.toString(), rowIndex
                    );
                    
                    String filePath = OUTPUT_DIR + filename;
                    
                    // Generate QR code
                    generateQRCode(data, size, size, ecc, CHARSET, MARGIN, filePath);
                    
                    // Get file info
                    File qrFile = new File(filePath);
                    long fileSize = qrFile.length();
                    
                    // Create row and set values
                    Row row = sheet.createRow(rowIndex++);
                    row.setHeightInPoints(100); // Set row height for image
                    
                    int colIndex = 0;
                    row.createCell(colIndex++).setCellValue(data);
                    row.createCell(colIndex++).setCellValue(size + "x" + size);
                    row.createCell(colIndex++).setCellValue(ecc.toString());
                    row.createCell(colIndex++).setCellValue(CHARSET);
                    row.createCell(colIndex++).setCellValue(String.valueOf(MARGIN));
                    row.createCell(colIndex++).setCellValue(filePath);
                    row.createCell(colIndex++).setCellValue(fileSize);
                    
                    // Embed image in Excel
                    try {
                        // Read image file into byte array
                        byte[] pictureData = new FileInputStream(qrFile).readAllBytes();
                        
                        // Add picture to workbook
                        int pictureIdx = workbook.addPicture(pictureData, Workbook.PICTURE_TYPE_PNG);
                        
                        // Create drawing patriarch
                        Drawing<?> drawing = sheet.createDrawingPatriarch();
                        
                        // Create anchor for picture
                        ClientAnchor anchor = workbook.getCreationHelper().createClientAnchor();
                        anchor.setCol1(colIndex); // Column for image (0-based)
                        anchor.setRow1(row.getRowNum()); // Row for image
                        
                        // Create picture
                        Picture picture = drawing.createPicture(anchor, pictureIdx);
                        
                        // Resize image (scale factor)
                        picture.resize(0.3); // 30% of original size
                    } catch (IOException e) {
                        System.err.println("Failed to embed image for " + filePath + ": " + e.getMessage());
                        row.createCell(colIndex).setCellValue("Image embed failed");
                    }
                    
                    System.out.println("Generated and added to Excel: " + filename);
                }
            }
        }
        
        // Write Excel file
        String excelFilePath = OUTPUT_DIR + "results_with_images.xlsx";
        try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
            workbook.write(outputStream);
        }
        
        System.out.println("\n=== QR TEST WITH EXCEL (IMAGES) COMPLETE ===");
        System.out.println("Generated " + (TEST_DATA.size() * SIZES.length * ECC_LEVELS.length) + " QR codes");
        System.out.println("Excel report saved to: " + excelFilePath);
        
        // Close workbook
        workbook.close();
    }

    /**
     * Generates a QR code with specified parameters.
     *
     * @param data       Data to encode
     * @param width      Width in pixels
     * @param height     Height in pixels
     * @param eccLevel   Error correction level
     * @param charset    Character encoding
     * @param margin     Quiet zone margin
     * @param filePath   Output file path
     * @throws IOException If writing fails
     * @throws WriterException If encoding fails
     */
    private static void generateQRCode(
            String data, 
            int width, 
            int height, 
            ErrorCorrectionLevel eccLevel, 
            String charset, 
            int margin,
            String filePath) throws IOException, WriterException {
        
        // Configure hints
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.ERROR_CORRECTION, eccLevel);
        hints.put(EncodeHintType.MARGIN, margin);
        hints.put(EncodeHintType.CHARACTER_SET, charset);
        
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