package com.fareye.labelengine.core;

import com.fareye.labelengine.constants.LabelPdfConstants;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import uk.org.okapibarcode.backend.Code128;
import uk.org.okapibarcode.backend.DataMatrix;
import uk.org.okapibarcode.backend.HumanReadableLocation;
import uk.org.okapibarcode.backend.Symbol;
import uk.org.okapibarcode.graphics.Color;
import uk.org.okapibarcode.output.Java2DRenderer;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

public class LabelBarcodeUtil {

    private static final String TMP_DIR = "/tmp/";

    public static String getCodes(String value, String type, String tempFileName) {
        if (value == null || value.isBlank()) {
            return "";
        }
        try {
            return createBarCode(value, type, "UTF-8", 200, 200, tempFileName, true);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to generate barcode: " + ex.getMessage(), ex);
        }
    }

    public static String createBarCode(String barcodeData,
                                       String type,
                                       String charset,
                                       int height,
                                       int width,
                                       String tempFileName,
                                       boolean isImagePath) throws WriterException, IOException {
        String dir = TMP_DIR + tempFileName;
        new File(dir).mkdirs();
        String filePath = dir + "/" + type + Calendar.getInstance().getTimeInMillis() + UUID.randomUUID() + ".png";

        BarcodeFormat barcodeFormat = BarcodeFormat.CODE_128;
        if (type.toLowerCase(Locale.ENGLISH).startsWith("qr_code")) {
            barcodeFormat = BarcodeFormat.QR_CODE;
        } else if (type.equalsIgnoreCase("code128")) {
            barcodeFormat = BarcodeFormat.CODE_128;
        } else if (type.equalsIgnoreCase("code39")) {
            barcodeFormat = BarcodeFormat.CODE_39;
        } else if (type.equalsIgnoreCase("ean13")) {
            barcodeFormat = BarcodeFormat.EAN_13;
        } else if (type.equalsIgnoreCase("upc")) {
            barcodeFormat = BarcodeFormat.UPC_A;
        } else if (type.equalsIgnoreCase("code93")) {
            barcodeFormat = BarcodeFormat.CODE_93;
        } else if (type.equalsIgnoreCase("ean8")) {
            barcodeFormat = BarcodeFormat.EAN_8;
        } else if (type.equalsIgnoreCase("pdf417")) {
            barcodeFormat = BarcodeFormat.PDF_417;
        } else if (type.equalsIgnoreCase(LabelPdfConstants.GS1_BARCODE_128)
                || type.equalsIgnoreCase(LabelPdfConstants.GS1_BARCODE_128_HUMAN_READABLE)
                || type.equalsIgnoreCase(LabelPdfConstants.GS1_DATAMATRIX)) {
            return createGS1Code(barcodeData, type, filePath, isImagePath);
        }

        Map<EncodeHintType, Object> hintMap = new HashMap<>();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        hintMap.put(EncodeHintType.MARGIN, 0);

        BitMatrix matrix;
        if (type.toLowerCase(Locale.ENGLISH).contains("without_charset")) {
            matrix = generateBitMatrixWithoutCharset(barcodeData, hintMap, height, width, barcodeFormat);
        } else {
            hintMap.put(EncodeHintType.CHARACTER_SET, charset);
            matrix = generateBitMatrixWithCharset(barcodeData, charset, hintMap, height, width, barcodeFormat);
        }

        MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath.lastIndexOf('.') + 1), new File(filePath));
        return isImagePath ? filePath : "<img src='" + filePath + "' height=\"100%\" width=\"100%\" />";
    }

    private static BitMatrix generateBitMatrixWithCharset(String data,
                                                          String charset,
                                                          Map<EncodeHintType, Object> hintMap,
                                                          int height,
                                                          int width,
                                                          BarcodeFormat barcodeFormat) throws UnsupportedEncodingException {
        try {
            return new MultiFormatWriter().encode(new String(data.getBytes(charset), charset),
                    barcodeFormat, width, height, hintMap);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    private static BitMatrix generateBitMatrixWithoutCharset(String data,
                                                             Map<EncodeHintType, Object> hintMap,
                                                             int height,
                                                             int width,
                                                             BarcodeFormat barcodeFormat) {
        try {
            return new MultiFormatWriter().encode(data, barcodeFormat, width, height, hintMap);
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    private static String createGS1Code(String data, String type, String filePath, boolean isImagePath)
            throws WriterException, IOException {
        if (type.equalsIgnoreCase(LabelPdfConstants.GS1_BARCODE_128)) {
            createGS1Barcode128(data, filePath, false);
        } else if (type.equalsIgnoreCase(LabelPdfConstants.GS1_BARCODE_128_HUMAN_READABLE)) {
            createGS1Barcode128(data, filePath, true);
        } else if (type.equalsIgnoreCase(LabelPdfConstants.GS1_DATAMATRIX)) {
            createGS1DataMatrix(data, filePath);
        } else {
            throw new IllegalArgumentException("Invalid GS1 format: " + type);
        }

        return isImagePath ? filePath : "<img src='" + filePath + "' height=\"100%\" width=\"100%\" />";
    }

    private static void createGS1Barcode128(String data, String filePath, boolean humanReadable) {
        Code128 barcode = new Code128();
        barcode.setDataType(Symbol.DataType.GS1);
        barcode.setHumanReadableLocation(humanReadable ? HumanReadableLocation.BOTTOM : HumanReadableLocation.NONE);
        barcode.setContent(data);

        int magnification = 2;
        BufferedImage image = new BufferedImage((barcode.getWidth() * magnification),
                (barcode.getHeight() * magnification), BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = (Graphics2D) image.getGraphics();
        Java2DRenderer renderer = new Java2DRenderer(g2d, magnification, Color.WHITE, Color.BLACK);
        renderer.render(barcode);
        try {
            ImageIO.write(image, "png", new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static void createGS1DataMatrix(String data, String filePath) {
        DataMatrix dataMatrix = new DataMatrix();
        dataMatrix.setDataType(Symbol.DataType.GS1);
        dataMatrix.setGs1SeparatorGs(true);
        dataMatrix.setForceMode(DataMatrix.ForceMode.SQUARE);
        dataMatrix.setPreferredSize(LabelPdfConstants.GS1_DATAMATRIX_PREFERRED_SIZE);
        dataMatrix.setContent(data);

        int magnification = 10;
        BufferedImage image = new BufferedImage((dataMatrix.getWidth() * magnification),
                (dataMatrix.getHeight() * magnification), BufferedImage.TYPE_INT_RGB);
        Graphics2D g2D = image.createGraphics();
        g2D.setColor(java.awt.Color.WHITE);

        Java2DRenderer renderer = new Java2DRenderer(g2D, magnification, Color.WHITE, Color.BLACK);
        renderer.render(dataMatrix);
        try {
            ImageIO.write(image, "png", new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
