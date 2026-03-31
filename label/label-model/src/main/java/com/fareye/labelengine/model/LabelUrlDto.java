package com.fareye.labelengine.model;

import com.fareye.labelengine.enumerator.LabelFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabelUrlDto {
    private String id;
    private String consignmentNumber;
    private String orderNumber;
    private String packageId;
    private Long orgId;
    private String timeZone;
    private String source;
    private String manifestNumber;
    private String key;
    private Integer index;
    private LabelFormat labelFormat;
    private boolean fromV2Api;
}
