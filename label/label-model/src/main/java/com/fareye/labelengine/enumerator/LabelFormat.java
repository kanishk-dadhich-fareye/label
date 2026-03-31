package com.fareye.labelengine.enumerator;

public enum LabelFormat {
    PDF, ZPL;

    public static LabelFormat fromString(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return LabelFormat.valueOf(value.trim().toUpperCase());
    }
}
