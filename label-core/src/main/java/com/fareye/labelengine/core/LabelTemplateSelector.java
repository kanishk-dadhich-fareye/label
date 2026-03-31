package com.fareye.labelengine.core;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.model.LabelTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class LabelTemplateSelector {

    public LabelTemplate select(
            LabelTypeEnum labelType,
            String partyCode,
            String serviceType,
            String hubCode,
            String businessUnit,
            Integer printerDpi,
            LabelFormat requestedFormat,
            Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> labelTemplateEntityMap
    ) {
        if (labelType == null || labelTemplateEntityMap == null || labelTemplateEntityMap.isEmpty()) {
            return null;
        }

        if (LabelTypeEnum.MANIFEST.equals(labelType)) {
            Map<String, List<LabelTemplate>> labelTemplatePartyCodeMap = labelTemplateEntityMap.get(labelType);
            if (labelTemplatePartyCodeMap == null) {
                return null;
            }
            List<LabelTemplate> byParty = labelTemplatePartyCodeMap.get(partyCode);
            if (byParty != null && !byParty.isEmpty()) {
                return byParty.getFirst();
            }
            List<LabelTemplate> defaults = labelTemplatePartyCodeMap.get(LabelTemplateMapBuilder.DEFAULT_PARTY_KEY);
            return (defaults == null || defaults.isEmpty()) ? null : defaults.getFirst();
        }

        if (LabelTypeEnum.PACKAGE.equals(labelType)) {
            Map<String, List<LabelTemplate>> labelTemplatePartyCodeMap = labelTemplateEntityMap.get(labelType);
            if (labelTemplatePartyCodeMap == null || !labelTemplatePartyCodeMap.containsKey(partyCode)) {
                return null;
            }
            List<LabelTemplate> labelTemplateList = labelTemplatePartyCodeMap.get(partyCode);
            if (labelTemplateList == null || labelTemplateList.isEmpty()) {
                return null;
            }

            List<LabelTemplate> pdfLabelTemplateList = new ArrayList<>();
            List<LabelTemplate> zplLabelTemplateList = new ArrayList<>();
            for (LabelTemplate labelTemplate : labelTemplateList) {
                if (LabelFormat.ZPL.equals(labelTemplate.getLabelFormat())) {
                    zplLabelTemplateList.add(labelTemplate);
                } else if (labelTemplate.getLabelFormat() == null || LabelFormat.PDF.equals(labelTemplate.getLabelFormat())) {
                    pdfLabelTemplateList.add(labelTemplate);
                }
            }

            if (requestedFormat == null) {
                LabelTemplate pdfTemplate = selectByPriority(pdfLabelTemplateList, serviceType, hubCode, businessUnit, printerDpi);
                if (pdfTemplate != null) {
                    return pdfTemplate;
                }
                return selectByPriority(zplLabelTemplateList, serviceType, hubCode, businessUnit, printerDpi);
            }

            if (LabelFormat.PDF.equals(requestedFormat)) {
                return selectByPriority(pdfLabelTemplateList, serviceType, hubCode, businessUnit, printerDpi);
            }

            return selectByPriority(zplLabelTemplateList, serviceType, hubCode, businessUnit, printerDpi);
        }

        return null;
    }

    private LabelTemplate selectByPriority(List<LabelTemplate> labelTemplateList, String serviceType, String hubCode, String businessUnit, Integer printerDpi) {
        if (labelTemplateList == null || labelTemplateList.isEmpty()) {
            return null;
        }
        LabelTemplate highestPriorityTemplate = null;
        int highestPriority = Integer.MAX_VALUE;
        for (LabelTemplate labelTemplate : labelTemplateList) {
            int priority = calculatePriority(labelTemplate, serviceType, hubCode, businessUnit, printerDpi);
            if (priority < highestPriority) {
                highestPriority = priority;
                highestPriorityTemplate = labelTemplate;
            }
        }
        return highestPriorityTemplate;
    }

    private int calculatePriority(LabelTemplate template, String serviceType, String hubCode, String businessUnit, Integer printerDpi) {
        boolean hasServiceType = hasText(template.getServiceType());
        boolean hasHubCode = hasText(template.getHubCode());
        boolean hasBusinessUnit = hasText(template.getBusinessUnit());
        boolean hasPrinterDpi = template.getPrinterDpi() != null;

        boolean matchesServiceType = hasServiceType && template.getServiceType().equalsIgnoreCase(serviceType);
        boolean matchesHubCode = hasHubCode && template.getHubCode().equalsIgnoreCase(hubCode);
        boolean matchesBusinessUnit = hasBusinessUnit && template.getBusinessUnit().equalsIgnoreCase(businessUnit);
        boolean matchesPrinterDpi = hasPrinterDpi && template.getPrinterDpi().equals(printerDpi);

        if (matchesServiceType && matchesHubCode && matchesBusinessUnit && matchesPrinterDpi) {
            return 1;
        }
        if (matchesServiceType && matchesHubCode && matchesBusinessUnit && !hasPrinterDpi) {
            return 2;
        }
        if (matchesServiceType && matchesHubCode && matchesPrinterDpi && !hasBusinessUnit) {
            return 3;
        }
        if (matchesServiceType && matchesBusinessUnit && matchesPrinterDpi && !hasHubCode) {
            return 4;
        }
        if (matchesHubCode && matchesBusinessUnit && matchesPrinterDpi && !hasServiceType) {
            return 5;
        }
        if (matchesServiceType && matchesHubCode && !hasBusinessUnit && !hasPrinterDpi) {
            return 6;
        }
        if (matchesServiceType && matchesBusinessUnit && !hasHubCode && !hasPrinterDpi) {
            return 7;
        }
        if (matchesHubCode && matchesBusinessUnit && !hasServiceType && !hasPrinterDpi) {
            return 8;
        }
        if (matchesServiceType && matchesPrinterDpi && !hasHubCode && !hasBusinessUnit) {
            return 9;
        }
        if (matchesHubCode && matchesPrinterDpi && !hasServiceType && !hasBusinessUnit) {
            return 10;
        }
        if (matchesBusinessUnit && matchesPrinterDpi && !hasServiceType && !hasHubCode) {
            return 11;
        }
        if (matchesServiceType && !hasHubCode && !hasBusinessUnit && !hasPrinterDpi) {
            return 12;
        }
        if (matchesHubCode && !hasServiceType && !hasBusinessUnit && !hasPrinterDpi) {
            return 13;
        }
        if (matchesBusinessUnit && !hasServiceType && !hasHubCode && !hasPrinterDpi) {
            return 14;
        }
        if (matchesPrinterDpi && !hasServiceType && !hasHubCode && !hasBusinessUnit) {
            return 15;
        }
        if (!hasServiceType && !hasHubCode && !hasBusinessUnit && !hasPrinterDpi) {
            return 16;
        }

        return Integer.MAX_VALUE;
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
