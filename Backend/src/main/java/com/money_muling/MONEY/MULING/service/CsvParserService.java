package com.money_muling.MONEY.MULING.service;

import com.money_muling.MONEY.MULING.model.Transaction;
import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvParserService {

    public List<Transaction> parse(MultipartFile file) throws Exception {

        List<Transaction> transactions = new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        try (CSVReader reader = new CSVReader(
                new InputStreamReader(file.getInputStream()))) {

            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {

                if (line.length < 5) {
                    continue;
                }

                try {
                    Transaction transaction = new Transaction(
                            line[0].trim(),
                            line[1].trim(),
                            line[2].trim(),
                            Double.parseDouble(line[3].trim()),
                            LocalDateTime.parse(line[4].trim(), formatter)
                    );

                    transactions.add(transaction);

                } catch (Exception e) {
                    System.out.println("Invalid row skipped " +
                            String.join(",", line));
                }
            }
        }

        return transactions;
    }
}
