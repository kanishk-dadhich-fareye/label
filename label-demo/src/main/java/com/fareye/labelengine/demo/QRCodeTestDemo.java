package com.fareye.labelengine.demo;

import com.fareye.labelengine.core.LabelBarcodeUtil;
import java.io.File;

public class QRCodeTestDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("=== QR Code Generation Test ===\n");
        
        // Test 1: Generate QR code using TemplateDataTypes approach (like templates use)
        System.out.println("Test 1: Generate QR code (using same method templates use)");
        
        String qrCodePath = LabelBarcodeUtil.getCodes("TRACKING123456789", "Qr_Code", "qr_test_demo");
        System.out.println("QR Code generated at: " + qrCodePath);
        
        // Check file exists
        File qrFile = new File(qrCodePath);
        System.out.println("File exists: " + qrFile.exists());
        System.out.println("File size: " + qrFile.length() + " bytes");
        
        // Test 2: Show what parameters are used
        System.out.println("\nTest 2: QR Code Settings Used");
        System.out.println("- Error Correction: H (High - 30%)");
        System.out.println("- Quiet Zone (Margin): 4 modules");
        System.out.println("- Default Size: 300x300 pixels (when not specified)");
        
        // Test 3: Generate linear barcode for comparison
        System.out.println("\nTest 3: Generate CODE_128 barcode (for comparison)");
        String code128Path = LabelBarcodeUtil.getCodes("TRACKING123456789", "code128", "qr_test_demo");
        System.out.println("CODE_128 generated at: " + code128Path);
        
        // Test 4: Generate generic QR (no charset)  
        System.out.println("\nTest 4: Generate QR without charset");
        String qrNoCharsetPath = LabelBarcodeUtil.getCodes("TRACKING123456789", "Qr_Code_without_charset", "qr_test_demo");
        System.out.println("QR (no charset) generated at: " + qrNoCharsetPath);
        
        System.out.println("\n=== All tests completed ===");
    }
}