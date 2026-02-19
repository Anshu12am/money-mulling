package com.money_muling.MONEY.MULING.service;

import com.money_muling.MONEY.MULING.graph.DirectedGraph;
import com.money_muling.MONEY.MULING.model.AccountNode;
import com.money_muling.MONEY.MULING.model.Transaction;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;

@Service
public class SmurfingDetectionService {

    private static final int THRESHOLD = 10;

    public Set<String> detect(DirectedGraph graph) {

        if (graph == null || graph.getNodes() == null) {
            return Collections.emptySet();
        }

        Set<String> suspicious = new HashSet<>();

        for (AccountNode node : graph.getNodes().values()) {

            if (node == null) continue;

            List<Transaction> incoming =
                    node.getIncoming() != null
                            ? new ArrayList<>(node.getIncoming())
                            : Collections.emptyList();

            List<Transaction> outgoing =
                    node.getOutgoing() != null
                            ? new ArrayList<>(node.getOutgoing())
                            : Collections.emptyList();

            if (incoming.size() >= THRESHOLD &&
                    within72Hours(incoming)) {
                suspicious.add(node.getAccountId());
            }

            if (outgoing.size() >= THRESHOLD &&
                    within72Hours(outgoing)) {
                suspicious.add(node.getAccountId());
            }
        }

        return suspicious;
    }

    private boolean within72Hours(List<Transaction> txs) {

        if (txs == null || txs.size() < 2) {
            return false;
        }

        // Remove transactions with null timestamps
        txs.removeIf(tx -> tx == null || tx.getTimestamp() == null);

        if (txs.size() < 2) {
            return false;
        }

        txs.sort(Comparator.comparing(Transaction::getTimestamp));

        long hours = Duration.between(
                txs.get(0).getTimestamp(),
                txs.get(txs.size() - 1).getTimestamp()
        ).toHours();

        return hours <= 72;
    }
}
