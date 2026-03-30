package com.fareye.labelengine.server.dto;

public class PartyMasterDto {
    private String merchantCode;

    public PartyMasterDto() {
    }

    public PartyMasterDto(String merchantCode) {
        this.merchantCode = merchantCode;
    }

    public String getMerchantCode() {
        return merchantCode;
    }

    public void setMerchantCode(String merchantCode) {
        this.merchantCode = merchantCode;
    }
}
