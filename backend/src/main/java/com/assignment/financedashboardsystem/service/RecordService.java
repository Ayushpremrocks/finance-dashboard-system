package com.assignment.financedashboardsystem.service;

import com.assignment.financedashboardsystem.dto.request.CreateRecordRequest;
import com.assignment.financedashboardsystem.entity.FinancialRecord;
import com.assignment.financedashboardsystem.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;

    public FinancialRecord createRecord(CreateRecordRequest request) {
        FinancialRecord record = FinancialRecord.builder()
                .amount(request.amount())
                .type(request.type())
                .category(request.category())
                .date(request.date())
                .notes(request.notes())
                .build();
        return recordRepository.save(record);
    }

    public Page<FinancialRecord> getAllActiveRecords(Pageable pageable) {
        return recordRepository.findAllByIsDeletedFalse(pageable);
    }
// todo: check if softdelete is required or not, otherwise delete it
    public void softDeleteRecord(UUID id) {
        FinancialRecord record = recordRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Record not found"));
        record.setDeleted(true);
        recordRepository.save(record);
    }
}