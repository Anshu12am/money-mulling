package com.money_muling.MONEY.MULING.dto;



import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor

@Builder
public class SuspiciousAccountDTOResponse {

    SuspiciousAccountDTOResponse()
    {

    }

    public SuspiciousAccountDTOResponse(String accountId, double suspicionScore, List<String> detectedPatterns, String ringId) {
        this.accountId = accountId;
        this.suspicionScore = suspicionScore;
        this.detectedPatterns = detectedPatterns;
        this.ringId = ringId;
    }

    @JsonProperty("account_id")
    private String accountId;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public double getSuspicionScore() {
        return suspicionScore;
    }

    public void setSuspicionScore(double suspicionScore) {
        this.suspicionScore = suspicionScore;
    }

    public List<String> getDetectedPatterns() {
        return detectedPatterns;
    }

    public void setDetectedPatterns(List<String> detectedPatterns) {
        this.detectedPatterns = detectedPatterns;
    }

    public String getRingId() {
        return ringId;
    }

    public void setRingId(String ringId) {
        this.ringId = ringId;
    }

    @JsonProperty("suspicion_score")
    private double suspicionScore;

    @JsonProperty("detected_patterns")
    private List<String> detectedPatterns;

    @JsonProperty("ring_id")
    private String ringId;
}

