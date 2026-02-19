package com.money_muling.MONEY.MULING.service;

import com.money_muling.MONEY.MULING.graph.DirectedGraph;
import com.money_muling.MONEY.MULING.model.AccountNode;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class ShellDetectionService {

    public Set<String> detect(DirectedGraph graph) {

        if (graph == null || graph.getNodes() == null) {
            return Collections.emptySet();
        }

        Set<String> shellAccounts = new HashSet<>();

        for (AccountNode node : graph.getNodes().values()) {

            if (node == null) continue;

            int outgoingSize = node.getOutgoing() != null
                    ? node.getOutgoing().size()
                    : 0;

            int incomingSize = node.getIncoming() != null
                    ? node.getIncoming().size()
                    : 0;

            int totalTransactions = outgoingSize + incomingSize;

            if (totalTransactions <= 3 &&
                    outgoingSize == 1 &&
                    incomingSize == 1) {

                if (node.getAccountId() != null) {
                    shellAccounts.add(node.getAccountId());
                }
            }
        }

        return shellAccounts;
    }
}
