package com.money_muling.MONEY.MULING.service;

import com.money_muling.MONEY.MULING.graph.DirectedGraph;
import com.money_muling.MONEY.MULING.model.AccountNode;
import com.money_muling.MONEY.MULING.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CycleDetectionService {

    public List<List<String>> detectCycles(DirectedGraph graph) {

        List<List<String>> cycles = new ArrayList<>();
        Map<String, AccountNode> nodes = graph.getNodes();

        for (String start : nodes.keySet()) {
            dfs(start, start, nodes,
                    new HashSet<>(),
                    new ArrayList<>(),
                    cycles, 5);
        }

        return removeDuplicateCycles(cycles);
    }

    private void dfs(String start,
                     String current,
                     Map<String, AccountNode> nodes,
                     Set<String> visited,
                     List<String> path,
                     List<List<String>> cycles,
                     int maxDepth) {

        if (path.size() > maxDepth) return;

        AccountNode node = nodes.get(current);
        if (node == null) return; // Null safety

        visited.add(current);
        path.add(current);

        for (Transaction tx : node.getOutgoing()) {

            String next = tx.getReceiverId();

            if (next.equals(start) && path.size() >= 3) {
                cycles.add(new ArrayList<>(path));
            }

            if (!visited.contains(next)) {
                dfs(start, next, nodes,
                        visited, path, cycles, maxDepth);
            }
        }

        visited.remove(current);
        path.remove(path.size() - 1);
    }

    private List<List<String>> removeDuplicateCycles(
            List<List<String>> cycles) {

        Set<String> uniqueKeys = new HashSet<>();
        List<List<String>> result = new ArrayList<>();

        for (List<String> cycle : cycles) {


            List<String> normalized = new ArrayList<>(cycle);
            Collections.sort(normalized);

            String key = String.join("-", normalized);

            if (!uniqueKeys.contains(key)) {
                uniqueKeys.add(key);
                result.add(cycle);
            }
        }

        return result;
    }
}
