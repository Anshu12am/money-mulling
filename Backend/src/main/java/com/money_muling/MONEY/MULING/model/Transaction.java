package com.money_muling.MONEY.MULING.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data

@NoArgsConstructor
public class Transaction {
        public Transaction(String transactionId, String senderId, String receiverId, double amount, LocalDateTime timestamp) {
                this.transactionId = transactionId;
                this.senderId = senderId;
                this.receiverId = receiverId;
                this.amount = amount;
                this.timestamp = timestamp;
        }

        private String transactionId;

        public String getTransactionId() {
                return transactionId;
        }

        public void setTransactionId(String transactionId) {
                this.transactionId = transactionId;
        }

        public String getSenderId() {
                return senderId;
        }

        public void setSenderId(String senderId) {
                this.senderId = senderId;
        }

        public String getReceiverId() {
                return receiverId;
        }

        public void setReceiverId(String receiverId) {
                this.receiverId = receiverId;
        }

        public double getAmount() {
                return amount;
        }

        public void setAmount(double amount) {
                this.amount = amount;
        }

        public LocalDateTime getTimestamp() {
                return timestamp;
        }

        public void setTimestamp(LocalDateTime timestamp) {
                this.timestamp = timestamp;
        }

        private String senderId;
        private String receiverId;
        private double amount;
        private LocalDateTime timestamp;

}
