package com.fareye.labelengine.adapters;

import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.model.LabelTemplate;

import java.util.List;
import java.util.Map;

public interface LabelTemplateDataSource {
    Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> loadTemplateMap(Long orgId);
}
