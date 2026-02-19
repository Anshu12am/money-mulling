package com.money_muling.MONEY.MULING.service;

import org.springframework.stereotype.Service;


@Service
public class SuspicionScoringService {

    public double score(boolean cycle,
                        boolean smurf,
                        boolean shell) {

        double score = 0;

        if (cycle) score += 50;
        if (smurf) score += 30;
        if (shell) score += 20;

        return Math.min(score, 100);
    }
}

