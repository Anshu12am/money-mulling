package com.money_muling.MONEY.MULING.model;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AccountNode {

    public AccountNode() {
        // required for putIfAbsent
    }
    public String getAccountId() {
        return accountId;
    }


    public AccountNode(String accountId, List<Transaction> outgoing, List<Transaction> incoming) {
        this.accountId = accountId;
        this.outgoing = outgoing;
        this.incoming = incoming;
    }


    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public List<Transaction> getOutgoing() {
        return outgoing;
    }

    public void setOutgoing(List<Transaction> outgoing) {
        this.outgoing = outgoing;
    }

    public List<Transaction> getIncoming() {
        return incoming;
    }

    public void setIncoming(List<Transaction> incoming) {
        this.incoming = incoming;
    }

    private String accountId;
    private List<Transaction> outgoing = new ArrayList<>();
    private List<Transaction> incoming = new ArrayList<>();

    public int totalTransactions() {
        return outgoing.size() + incoming.size();
    }
}

