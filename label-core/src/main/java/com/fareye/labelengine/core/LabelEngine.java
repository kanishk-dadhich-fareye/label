package com.fareye.labelengine.core;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.model.LabelTemplate;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public class LabelEngine {

    private final LabelTemplateSelector selector;
    private final LabelTemplateRenderer renderer;

    public LabelEngine() {
        this.selector = new LabelTemplateSelector();
        this.renderer = new LabelTemplateRenderer();
    }

    public LabelTemplate selectTemplate(LabelTypeEnum labelType,
                                        String partyCode,
                                        String serviceType,
                                        String hubCode,
                                        String businessUnit,
                                        LabelFormat requestedFormat,
                                        Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> templateMap) {
        return selector.select(labelType, partyCode, serviceType, hubCode, businessUnit, requestedFormat, templateMap);
    }

    public Path render(LabelTemplate template,
                       Map<String, Object> model,
                       Path outputDir) throws IOException {
        if (template == null) {
            throw new IllegalArgumentException("Template is required");
        }
        if (LabelFormat.ZPL.equals(template.getLabelFormat())) {
            return renderer.renderZpl(template.getScript(), model, outputDir);
        }
        return renderer.renderPdf(template.getScript(), model, template.getPageSize(), outputDir);
    }
}
