package com.money_muling.MONEY.MULING.graph;

import com.money_muling.MONEY.MULING.model.AccountNode;
import com.money_muling.MONEY.MULING.model.Transaction;

import java.util.HashMap;
import java.util.Map;

public class DirectedGraph
{
    private final Map<String, AccountNode> nodes=new HashMap<>();

    public Map<String, AccountNode> getNodes() {
        return nodes;
    }

    public void addtransaction(Transaction transaction)
{
    nodes.putIfAbsent(transaction.getSenderId(),new AccountNode());

    nodes.putIfAbsent(transaction.getReceiverId(),new AccountNode());
    AccountNode sender=nodes.get(transaction.getSenderId());
    AccountNode receiver=nodes.get(transaction.getReceiverId());
    sender.setAccountId(transaction.getSenderId());
    receiver.setAccountId(transaction.getReceiverId());
    sender.getOutgoing().add(transaction);
    receiver.getIncoming().add(transaction);

}

}
