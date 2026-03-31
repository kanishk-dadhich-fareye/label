package com.fareye.labelengine.demo;

import com.fareye.labelengine.core.LabelEngine;
import com.fareye.labelengine.core.LabelTemplateMapBuilder;
import com.fareye.labelengine.dto.TemplateDataTypes;
import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.enumerator.TemplateStatus;
import com.fareye.labelengine.model.LabelTemplate;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public class LabelDemoApp {
    public static void main(String[] args) throws Exception {
        String tempFileName = "demo_" + System.currentTimeMillis();
        TemplateDataTypes tracking = new TemplateDataTypes("TRK123456789", tempFileName);

        String html = ""
                + "<div style='font-size:18px;'>Hello <span th:text=\"${name}\">World</span></div>"
                + "<div style='margin-top:10px;'>Tracking: <span th:text=\"${tracking.text}\">TRK</span></div>"
                + "<div style='margin-top:10px;'>"
                + "<img th:src=\"${tracking.code128}\" style='height:60px;width:200px;'/>"
                + "</div>";

        LabelTemplate template = LabelTemplate.builder()
                .name("Demo Label")
                .code("DEMO_TEMPLATE")
                .script(html)
                .status(TemplateStatus.ACTIVE)
                .pageSize("4x6")
                .labelType(LabelTypeEnum.PACKAGE)
                .labelFormat(LabelFormat.PDF)
                .isDefaultConfig(true)
                .build();

        Map<String, List<String>> templatePartyMap = Map.of(
                "DEMO_TEMPLATE", List.of("carrier_demo")
        );

        LabelTemplateMapBuilder mapBuilder = new LabelTemplateMapBuilder();
        Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> templateMap =
                mapBuilder.createLabelTemplateEntityMap(List.of(template), templatePartyMap);

        LabelEngine engine = new LabelEngine();
        LabelTemplate selected = engine.selectTemplate(
                LabelTypeEnum.PACKAGE,
                "carrier_demo",
                "standard",
                "hub1",
                "bu1",
                LabelFormat.PDF,
                templateMap
        );

        Path out = engine.render(selected, Map.of("name", "Label Engine", "tracking", tracking), Path.of("/tmp/label-engine-demo"));
        System.out.println("Generated label: " + out);
    }
}
