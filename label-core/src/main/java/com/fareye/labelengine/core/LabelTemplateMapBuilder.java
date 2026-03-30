package com.fareye.labelengine.core;

import com.fareye.labelengine.enumerator.LabelTypeEnum;
import com.fareye.labelengine.model.LabelTemplate;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LabelTemplateMapBuilder {

    public static final String DEFAULT_PARTY_KEY = "default";

    public Map<LabelTypeEnum, Map<String, List<LabelTemplate>>> createLabelTemplateEntityMap(
            List<LabelTemplate> labelTemplateList,
            Map<String, List<String>> templatePartyMap) {

        return labelTemplateList.stream()
                .filter(labelTemplateEntity -> templatePartyMap.containsKey(labelTemplateEntity.getCode())
                        || Boolean.TRUE.equals(labelTemplateEntity.getIsDefaultConfig()))
                .flatMap(labelTemplateEntity -> {
                    Stream<AbstractMap.SimpleEntry<LabelTypeEnum, AbstractMap.SimpleEntry<String, LabelTemplate>>> mainStream = Stream.empty();

                    if (templatePartyMap.containsKey(labelTemplateEntity.getCode())) {
                        Stream<AbstractMap.SimpleEntry<LabelTypeEnum, AbstractMap.SimpleEntry<String, LabelTemplate>>> partyStream =
                                templatePartyMap.get(labelTemplateEntity.getCode()).stream()
                                        .map(partyCode -> new AbstractMap.SimpleEntry<>(labelTemplateEntity.getLabelType(),
                                                new AbstractMap.SimpleEntry<>(partyCode.toLowerCase(), labelTemplateEntity)));
                        mainStream = Stream.concat(mainStream, partyStream);
                    }

                    if (Boolean.TRUE.equals(labelTemplateEntity.getIsDefaultConfig())) {
                        Stream<AbstractMap.SimpleEntry<LabelTypeEnum, AbstractMap.SimpleEntry<String, LabelTemplate>>> defaultStream =
                                Stream.of(new AbstractMap.SimpleEntry<>(labelTemplateEntity.getLabelType(),
                                        new AbstractMap.SimpleEntry<>(DEFAULT_PARTY_KEY, labelTemplateEntity)));
                        mainStream = Stream.concat(mainStream, defaultStream);
                    }

                    return mainStream;
                })
                .collect(Collectors.groupingBy(
                        AbstractMap.SimpleEntry::getKey,
                        Collectors.groupingBy(
                                entry -> entry.getValue().getKey(),
                                Collectors.mapping(entry -> entry.getValue().getValue(), Collectors.toList())
                        )
                ));
    }
}
