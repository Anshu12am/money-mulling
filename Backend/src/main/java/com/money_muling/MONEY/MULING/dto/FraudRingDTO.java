package com.money_muling.MONEY.MULING.dto;



import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

        import java.util.List;

@Getter
@Setter
@AllArgsConstructor

@Builder
public class FraudRingDTO {

    public FraudRingDTO() {}


    public String getRingId() {
        return ringId;
    }

    public void setRingId(String ringId) {
        this.ringId = ringId;
    }

    public List<String> getMemberAccounts() {
        return memberAccounts;
    }

    public void setMemberAccounts(List<String> memberAccounts) {
        this.memberAccounts = memberAccounts;
    }

    public String getPatternType() {
        return patternType;
    }

    public void setPatternType(String patternType) {
        this.patternType = patternType;
    }

    public double getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(double riskScore) {
        this.riskScore = riskScore;
    }

    @JsonProperty("ring_id")
    private String ringId;

    @JsonProperty("member_accounts")
    private List<String> memberAccounts;

    @JsonProperty("pattern_type")
    private String patternType;//cycle,shell or smurfing

    @JsonProperty("risk_score")
    private double riskScore;
}

