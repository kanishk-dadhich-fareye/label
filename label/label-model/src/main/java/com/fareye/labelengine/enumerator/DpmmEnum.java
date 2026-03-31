package com.fareye.labelengine.enumerator;

/**
 * DPMM (Dots Per Millimeter) enumeration for ZPL label rendering.
 * Maps standard discrete DPMM values to their DPI equivalents.
 */
public enum DpmmEnum {
    DPI_152(6, 152),      // 6 DPI (203 DPI equivalent)
    DPI_203(8, 203),      // 8 DPI
    DPI_305(12, 305),     // 12 DPI
    DPI_609(24, 609);     // 24 DPI (600 DPI equivalent)

    private final int dpmm;
    private final int dpi;

    DpmmEnum(int dpmm, int dpi) {
        this.dpmm = dpmm;
        this.dpi = dpi;
    }

    public int getDpmm() {
        return dpmm;
    }

    public int getDpi() {
        return dpi;
    }

    /**
     * Get DpmmEnum from DPMM value.
     *
     * @param dpmm the DPMM value (6, 8, 12, or 24)
     * @return the corresponding DpmmEnum
     * @throws IllegalArgumentException if DPMM value is not supported
     */
    public static DpmmEnum fromDpmm(int dpmm) {
        for (DpmmEnum value : DpmmEnum.values()) {
            if (value.dpmm == dpmm) {
                return value;
            }
        }
        throw new IllegalArgumentException("Unsupported DPMM value: " + dpmm + ". Supported values: 6, 8, 12, 24");
    }

    /**
     * Get DpmmEnum from DPI value (nearest match).
     *
     * @param dpi the DPI value
     * @return the corresponding DpmmEnum
     * @throws IllegalArgumentException if DPI value doesn't match any supported DPMM
     */
    public static DpmmEnum fromDpi(int dpi) {
        for (DpmmEnum value : DpmmEnum.values()) {
            if (value.dpi == dpi) {
                return value;
            }
        }
        throw new IllegalArgumentException("Unsupported DPI value: " + dpi + ". Supported values: 152, 203, 305, 609");
    }

    /**
     * Convert DPI to nearest DPMM value.
     * Uses standard formula: DPMM = DPI / 25.4
     *
     * @param dpi the DPI value
     * @return the nearest DpmmEnum
     */
    public static DpmmEnum convertDpiToDpmm(int dpi) {
        int dpmm = Math.round(dpi / 25.4f);
        try {
            return fromDpmm(dpmm);
        } catch (IllegalArgumentException e) {
            // Find the nearest DPMM value
            DpmmEnum nearest = DPI_152;
            int minDiff = Math.abs(nearest.dpmm - dpmm);
            for (DpmmEnum value : DpmmEnum.values()) {
                int diff = Math.abs(value.dpmm - dpmm);
                if (diff < minDiff) {
                    minDiff = diff;
                    nearest = value;
                }
            }
            return nearest;
        }
    }
}
