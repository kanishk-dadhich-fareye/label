package com.fareye.labelengine.core;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.model.LabelTemplate;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class LabelTemplateSelectorTest {

    private final LabelTemplateSelector selector = new LabelTemplateSelector();

    @Test
    void testSelectWithPrinterDpi() {
        // Create test templates
        LabelTemplate template1 = LabelTemplate.builder()
                .code("T1")
                .labelType(LabelTypeEnum.PACKAGE)
                .serviceType("AIR")
                .businessUnit("BU1")
                .printerDpi(203)
                .build();

        LabelTemplate template2 = LabelTemplate.builder()
                .code("T2")
                .labelType(LabelTypeEnum.PACKAGE)
                .serviceType("AIR")
                .businessUnit("BU1")
                .printerDpi(300)
                .build();

        LabelTemplate template3 = LabelTemplate.builder()
                .code("T3")
                .labelType(LabelTypeEnum.PACKAGE)
                .serviceType("AIR")
                .businessUnit("BU1")
                .build(); // no printerDpi

        Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> templateMap = Map.of(
                LabelTypeEnum.PACKAGE, Map.of("party1", List.of(template1, template2, template3))
        );

        // Select with printerDpi 203
        LabelTemplate selected = selector.select(LabelTypeEnum.PACKAGE, "party1", "AIR", null, "BU1", 203, null, templateMap);
        assertEquals("T1", selected.getCode());

        // Select with printerDpi 300
        selected = selector.select(LabelTypeEnum.PACKAGE, "party1", "AIR", null, "BU1", 300, null, templateMap);
        assertEquals("T2", selected.getCode());

        // Select with printerDpi 203, but no exact match, should get the one without dpi
        selected = selector.select(LabelTypeEnum.PACKAGE, "party1", "AIR", null, "BU1", 400, null, templateMap);
        assertEquals("T3", selected.getCode());
    }

    @Test
    void testSelectNoMatch() {
        Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> templateMap = Map.of();
        LabelTemplate selected = selector.select(LabelTypeEnum.PACKAGE, "party1", "AIR", null, "BU1", 203, null, templateMap);
        assertNull(selected);
    }
}