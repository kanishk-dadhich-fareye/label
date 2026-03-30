package com.fareye.labelengine.dto;

import com.fareye.labelengine.constants.LabelPdfConstants;
import com.fareye.labelengine.core.LabelBarcodeUtil;

import java.util.List;
import java.util.Map;

public class TemplateDataTypes {

    private final String text;
    private final Double doubleVal;
    private final Integer integerVal;
    private final String tempFileName;
    private Map<Object, Object> map;
    private Map<String, TemplateDataTypes> templateDataTypeMap;
    private Map<String, List<TemplateDataTypes>> templateDataTypeMapOfList;

    public TemplateDataTypes(String text, String tempFileName) {
        this.text = text;
        this.tempFileName = tempFileName;
        Double parsedDouble;
        Integer parsedInt;
        try {
            parsedDouble = Double.parseDouble(text);
        } catch (Exception e) {
            parsedDouble = 0.0D;
        }
        try {
            parsedInt = Integer.parseInt(text);
        } catch (Exception e) {
            parsedInt = 0;
        }
        this.doubleVal = parsedDouble;
        this.integerVal = parsedInt;
    }

    public String getText() {
        return text;
    }

    public Integer getIntegerVal() {
        return integerVal;
    }

    public Double getDoubleVal() {
        return doubleVal;
    }

    public String getQrCode() {
        return LabelBarcodeUtil.getCodes(this.text, "Qr_Code", this.tempFileName);
    }

    public String getQrCodeNonUTF8() {
        return LabelBarcodeUtil.getCodes(this.text, "Qr_Code_without_charset", this.tempFileName);
    }

    public String getCode128() {
        return LabelBarcodeUtil.getCodes(this.text, "code128", this.tempFileName);
    }

    public String getCode39() {
        return LabelBarcodeUtil.getCodes(this.text, "code39", this.tempFileName);
    }

    public String getEan13() {
        return LabelBarcodeUtil.getCodes(this.text, "ean13", this.tempFileName);
    }

    public String getUpc() {
        return LabelBarcodeUtil.getCodes(this.text, "upc", this.tempFileName);
    }

    public String getCode93() {
        return LabelBarcodeUtil.getCodes(this.text, "code93", this.tempFileName);
    }

    public String getEan8() {
        return LabelBarcodeUtil.getCodes(this.text, "ean8", this.tempFileName);
    }

    public String getPdf417() {
        return LabelBarcodeUtil.getCodes(this.text, "pdf417", this.tempFileName);
    }

    public String getGs1Barcode128() {
        return LabelBarcodeUtil.getCodes(this.text, LabelPdfConstants.GS1_BARCODE_128, this.tempFileName);
    }

    public String getGs1Barcode128HR() {
        return LabelBarcodeUtil.getCodes(this.text, LabelPdfConstants.GS1_BARCODE_128_HUMAN_READABLE, this.tempFileName);
    }

    public String getGs1DataMatrix() {
        return LabelBarcodeUtil.getCodes(this.text, LabelPdfConstants.GS1_DATAMATRIX, this.tempFileName);
    }

    public String getTempFileName() {
        return tempFileName;
    }

    public Map<Object, Object> getMap() {
        return map;
    }

    public void setMap(Map<Object, Object> map) {
        this.map = map;
    }

    public Map<String, TemplateDataTypes> getTemplateDataTypeMap() {
        return templateDataTypeMap;
    }

    public void setTemplateDataTypeMap(Map<String, TemplateDataTypes> templateDataTypeMap) {
        this.templateDataTypeMap = templateDataTypeMap;
    }

    public Map<String, List<TemplateDataTypes>> getTemplateDataTypeMapOfList() {
        return templateDataTypeMapOfList;
    }

    public void setTemplateDataTypeMapOfList(Map<String, List<TemplateDataTypes>> templateDataTypeMapOfList) {
        this.templateDataTypeMapOfList = templateDataTypeMapOfList;
    }
}
