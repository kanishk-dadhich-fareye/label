package com.fareye.labelengine.model;

import com.fareye.labelengine.enumerator.LabelFormat;
import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.enumerator.TemplateStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LabelTemplate {
    private String name;
    private String code;
    private String script;
    private TemplateStatus status;
    private String pageSize;
    private String backgroundImage;
    private LabelTypeEnum labelType;
    private Boolean isDefaultConfig;
    private String serviceType;
    private String hubCode;
    private String businessUnit;
    private LabelFormat labelFormat;
    private Integer zplDpmm;
    private Double zplWidth;
    private Double zplHeight;
    private Integer printerDpi;
}
