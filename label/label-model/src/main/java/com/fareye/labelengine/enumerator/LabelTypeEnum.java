package com.fareye.labelengine.enumerator;

public enum LabelTypeEnum {
    PACKAGE("PACKAGE"),
    MANIFEST("MANIFEST");

    private final String configType;

    LabelTypeEnum(String configType) {
        this.configType = configType;
    }

    public String getConfigType() {
        return configType;
    }

    public static LabelTypeEnum fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return LabelTypeEnum.valueOf(value.trim().toUpperCase());
        } catch (Exception e) {
            return null;
        }
    }
}
