package com.fareye.labelengine.server.dto;

import java.util.ArrayList;
import java.util.List;

public class LabelTemplatePageDto {
    private int number;
    private int size;
    private int totalPages;
    private int numberOfElements;
    private long totalElements;
    private List<LabelTemplateResponseDto> content;

    public LabelTemplatePageDto() {
        this.content = new ArrayList<>();
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public List<LabelTemplateResponseDto> getContent() {
        return content;
    }

    public void setContent(List<LabelTemplateResponseDto> content) {
        this.content = content;
    }
}
