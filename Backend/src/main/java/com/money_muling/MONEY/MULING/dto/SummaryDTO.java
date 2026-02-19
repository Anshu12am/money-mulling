package com.money_muling.MONEY.MULING.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter

public class SummaryDTO {

    @JsonProperty("total_accounts_analyzed")
    private int totalAccountsAnalyzed;

    @JsonProperty("suspicious_accounts_flagged")
    private int suspiciousAccountsFlagged;

    public SummaryDTO() {
    }

    public SummaryDTO(int totalAccountsAnalyzed, int suspiciousAccountsFlagged, int fraudRingsDetected, double processingTimeSeconds) {
        this.totalAccountsAnalyzed = totalAccountsAnalyzed;
        this.suspiciousAccountsFlagged = suspiciousAccountsFlagged;
        this.fraudRingsDetected = fraudRingsDetected;
        this.processingTimeSeconds = processingTimeSeconds;
    }

    @JsonProperty("fraud_rings_detected")
    private int fraudRingsDetected;

    @JsonProperty("processing_time_seconds")
    private double processingTimeSeconds;

    public int getTotalAccountsAnalyzed() {
        return totalAccountsAnalyzed;
    }

    public void setTotalAccountsAnalyzed(int totalAccountsAnalyzed) {
        this.totalAccountsAnalyzed = totalAccountsAnalyzed;
    }

    public int getSuspiciousAccountsFlagged() {
        return suspiciousAccountsFlagged;
    }

    public void setSuspiciousAccountsFlagged(int suspiciousAccountsFlagged) {
        this.suspiciousAccountsFlagged = suspiciousAccountsFlagged;
    }

    public int getFraudRingsDetected() {
        return fraudRingsDetected;
    }

    public void setFraudRingsDetected(int fraudRingsDetected) {
        this.fraudRingsDetected = fraudRingsDetected;
    }

    public double getProcessingTimeSeconds() {
        return processingTimeSeconds;
    }

    public void setProcessingTimeSeconds(double processingTimeSeconds) {
        this.processingTimeSeconds = processingTimeSeconds;
    }
}

