package com.money_muling.MONEY.MULING.dto;



import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

        import java.util.List;

@Getter
@Setter
public class OutputResponseDTO {
    public OutputResponseDTO(
            List<SuspiciousAccountDTOResponse> suspiciousAccounts,
            List<FraudRingDTO> fraudRings,
            SummaryDTO summary) {

        this.suspiciousAccounts = suspiciousAccounts;
        this.fraudRings = fraudRings;
        this.summary = summary;
    }
    @JsonProperty("suspicious_accounts")
    private List<SuspiciousAccountDTOResponse> suspiciousAccounts;

    @JsonProperty("fraud_rings")
    private List<FraudRingDTO> fraudRings;

    @JsonProperty("summary")
    private SummaryDTO summary;

    public List<SuspiciousAccountDTOResponse> getSuspiciousAccounts() {
        return suspiciousAccounts;
    }

    public void setSuspiciousAccounts(List<SuspiciousAccountDTOResponse> suspiciousAccounts) {
        this.suspiciousAccounts = suspiciousAccounts;
    }

    public List<FraudRingDTO> getFraudRings() {
        return fraudRings;
    }

    public void setFraudRings(List<FraudRingDTO> fraudRings) {
        this.fraudRings = fraudRings;
    }

    public SummaryDTO getSummary() {
        return summary;
    }

    public void setSummary(SummaryDTO summary) {
        this.summary = summary;
    }
}

