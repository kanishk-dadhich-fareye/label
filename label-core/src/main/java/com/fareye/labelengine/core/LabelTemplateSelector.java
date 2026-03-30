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
                LabelTemplate pdfTemplate = selectByPriority(pdfLabelTemplateList, serviceType, hubCode, businessUnit);
                if (pdfTemplate != null) {
                    return pdfTemplate;
                }
                return selectByPriority(zplLabelTemplateList, serviceType, hubCode, businessUnit);
            }

            if (LabelFormat.PDF.equals(requestedFormat)) {
                return selectByPriority(pdfLabelTemplateList, serviceType, hubCode, businessUnit);
            }

            return selectByPriority(zplLabelTemplateList, serviceType, hubCode, businessUnit);
        }

        return null;
    }

    private LabelTemplate selectByPriority(List<LabelTemplate> labelTemplateList, String serviceType, String hubCode, String businessUnit) {
        if (labelTemplateList == null || labelTemplateList.isEmpty()) {
            return null;
        }
        LabelTemplate highestPriorityTemplate = null;
        int highestPriority = Integer.MAX_VALUE;
        for (LabelTemplate labelTemplate : labelTemplateList) {
            int priority = calculatePriority(labelTemplate, serviceType, hubCode, businessUnit);
            if (priority < highestPriority) {
                highestPriority = priority;
                highestPriorityTemplate = labelTemplate;
            }
        }
        return highestPriorityTemplate;
    }

    private int calculatePriority(LabelTemplate template, String serviceType, String hubCode, String businessUnit) {
        boolean hasServiceType = hasText(template.getServiceType());
        boolean hasHubCode = hasText(template.getHubCode());
        boolean hasBusinessUnit = hasText(template.getBusinessUnit());

        boolean matchesServiceType = hasServiceType && template.getServiceType().equalsIgnoreCase(serviceType);
        boolean matchesHubCode = hasHubCode && template.getHubCode().equalsIgnoreCase(hubCode);
        boolean matchesBusinessUnit = hasBusinessUnit && template.getBusinessUnit().equalsIgnoreCase(businessUnit);

        if (matchesServiceType && matchesHubCode && matchesBusinessUnit) {
            return 1;
        }
        if (matchesServiceType && matchesBusinessUnit && !hasHubCode) {
            return 2;
        }
        if (matchesServiceType && matchesHubCode && !hasBusinessUnit) {
            return 3;
        }
        if (matchesHubCode && matchesBusinessUnit && !hasServiceType) {
            return 4;
        }
        if (matchesServiceType && !hasHubCode && !hasBusinessUnit) {
            return 5;
        }
        if (matchesHubCode && !hasServiceType && !hasBusinessUnit) {
            return 6;
        }
        if (matchesBusinessUnit && !hasServiceType && !hasHubCode) {
            return 7;
        }
        if (!hasServiceType && !hasHubCode && !hasBusinessUnit) {
            return 8;
        }

        return Integer.MAX_VALUE;
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
