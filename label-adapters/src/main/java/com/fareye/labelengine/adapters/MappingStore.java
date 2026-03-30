package com.fareye.labelengine.adapters;

import java.util.List;
import java.util.Map;

public interface MappingStore {
    Map<String, List<String>> findTemplatePartyMap(Long orgId);
}
