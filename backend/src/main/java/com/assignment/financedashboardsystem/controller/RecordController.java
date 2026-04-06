package com.assignment.financedashboardsystem.controller;

import com.assignment.financedashboardsystem.dto.request.CreateRecordRequest;
import com.assignment.financedashboardsystem.entity.FinancialRecord;
import com.assignment.financedashboardsystem.service.RecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @GetMapping
    // todo: why preAuthorize?
    @PreAuthorize("hasAnyRole('ROLE_ANALYST', 'ROLE_ADMIN')")
    public ResponseEntity<Page<FinancialRecord>> getRecords(Pageable pageable) {
        return ResponseEntity.ok(recordService.getAllActiveRecords(pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<FinancialRecord> createRecord(@Valid @RequestBody CreateRecordRequest request) {
        return new ResponseEntity<>(recordService.createRecord(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRecord(@PathVariable UUID id) {
        recordService.softDeleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}