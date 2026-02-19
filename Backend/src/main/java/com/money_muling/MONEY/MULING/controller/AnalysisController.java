package com.money_muling.MONEY.MULING.controller;

import com.money_muling.MONEY.MULING.dto.OutputResponseDTO;
import com.money_muling.MONEY.MULING.model.Transaction;
import com.money_muling.MONEY.MULING.service.CsvParserService;
import com.money_muling.MONEY.MULING.service.ServicesMerger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AnalysisController {

    private final CsvParserService parser;
    private final ServicesMerger servicesMerger;

    public AnalysisController(CsvParserService parser,
                              ServicesMerger servicesMerger) {
        this.parser = parser;
        this.servicesMerger = servicesMerger;
    }

    @PostMapping(value = "/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> analyze(
            @RequestParam("file") MultipartFile file) {

        System.out.println("Controller hit");

        if (file == null || file.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("CSV file is missing or empty");
        }

        try {
            List<Transaction> txs = parser.parse(file);
            System.out.println("CSV parsed successfully");

            OutputResponseDTO response =
                    servicesMerger.analyze(txs);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Error processing file: "
                            + e.getMessage());
        }
    }
}
