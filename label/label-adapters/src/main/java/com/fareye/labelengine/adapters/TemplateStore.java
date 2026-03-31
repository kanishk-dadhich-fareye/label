package com.fareye.labelengine.adapters;

import com.fareye.labelengine.model.LabelTemplate;

import java.util.List;

public interface TemplateStore {
    List<LabelTemplate> findActiveTemplates(Long orgId);
}
