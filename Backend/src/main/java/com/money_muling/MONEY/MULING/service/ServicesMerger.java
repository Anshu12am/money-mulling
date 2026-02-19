package com.money_muling.MONEY.MULING.service;

import com.money_muling.MONEY.MULING.dto.OutputResponseDTO;
import com.money_muling.MONEY.MULING.dto.SummaryDTO;
import com.money_muling.MONEY.MULING.dto.SuspiciousAccountDTOResponse;
import com.money_muling.MONEY.MULING.graph.DirectedGraph;
import com.money_muling.MONEY.MULING.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ServicesMerger {

    private final CycleDetectionService cycleDetectionService;
    private final ShellDetectionService shellDetectionService;
    private final SmurfingDetectionService smurfingDetectionService;
    private final SuspicionScoringService suspicionScoringService;

    public ServicesMerger(CycleDetectionService cycleDetectionService,
                          ShellDetectionService shellDetectionService,
                          SmurfingDetectionService smurfingDetectionService,
                          SuspicionScoringService suspicionScoringService) {

        this.cycleDetectionService = cycleDetectionService;
        this.shellDetectionService = shellDetectionService;
        this.smurfingDetectionService = smurfingDetectionService;
        this.suspicionScoringService = suspicionScoringService;
    }

    public OutputResponseDTO analyze(List<Transaction> transactionList) {

        if (transactionList == null) {
            transactionList = Collections.emptyList();
        }

        System.out.println("Step 1: Building Graph");

        DirectedGraph directedGraph = new DirectedGraph();

        for (Transaction tx : transactionList) {
            if (tx != null) {
                directedGraph.addtransaction(tx);
            }
        }

        System.out.println("Step 2: Detecting Cycles");

        List<List<String>> cycles =
                Optional.ofNullable(
                        cycleDetectionService.detectCycles(directedGraph)
                ).orElse(Collections.emptyList());

        System.out.println("Step 3: Detecting Smurfing & Shell");

        Set<String> smurf =
                Optional.ofNullable(
                        smurfingDetectionService.detect(directedGraph)
                ).orElse(Collections.emptySet());

        Set<String> shell =
                Optional.ofNullable(
                        shellDetectionService.detect(directedGraph)
                ).orElse(Collections.emptySet());

        Set<String> cycleAccounts = cycles.stream()
                .flatMap(List::stream)
                .collect(Collectors.toSet());

        List<SuspiciousAccountDTOResponse> suspiciousAccounts =
                new ArrayList<>();

        for (String acc : directedGraph.getNodes().keySet()) {

            boolean inCycle = cycleAccounts.contains(acc);
            boolean inSmurf = smurf.contains(acc);
            boolean inShell = shell.contains(acc);

            double score = 0.0;

            try {
                score = suspicionScoringService
                        .score(inCycle, inSmurf, inShell);
            } catch (Exception e) {
                System.out.println("Scoring error for account: " + acc);
            }

            if (score > 0) {
                suspiciousAccounts.add(
                        new SuspiciousAccountDTOResponse(
                                acc,
                                score,
                                buildPatternList(inCycle, inSmurf, inShell),
                                inCycle ? "RING_001" : ""
                        )
                );
            }
        }

        suspiciousAccounts.sort(
                Comparator.comparingDouble(
                        SuspiciousAccountDTOResponse::getSuspicionScore
                ).reversed()
        );

        return new OutputResponseDTO(
                suspiciousAccounts,
                new ArrayList<>(), // Fraud rings can be added later
                buildSummary(directedGraph, suspiciousAccounts)
        );
    }

    private SummaryDTO buildSummary(
            DirectedGraph graph,
            List<SuspiciousAccountDTOResponse> suspiciousAccounts
    ) {

        int totalAccounts = graph.getNodes().size();
        int suspiciousCount = suspiciousAccounts.size();

        int fraudRingsDetected = 0; // can update later
        double processingTimeSeconds = 0.0;

        return new SummaryDTO(
                totalAccounts,
                suspiciousCount,
                fraudRingsDetected,
                processingTimeSeconds
        );
    }

    private List<String> buildPatternList(
            boolean inCycle,
            boolean inSmurf,
            boolean inShell
    ) {

        List<String> patterns = new ArrayList<>();

        if (inCycle) patterns.add("CIRCULAR_RING");
        if (inSmurf) patterns.add("SMURFING");
        if (inShell) patterns.add("SHELL_ACTIVITY");

        return patterns;
    }
}
