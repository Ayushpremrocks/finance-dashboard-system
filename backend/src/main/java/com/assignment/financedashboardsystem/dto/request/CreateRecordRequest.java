package com.assignment.financedashboardsystem.dto.request;

import com.assignment.financedashboardsystem.enums.RecordType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateRecordRequest(
        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be greater than zero")
        BigDecimal amount,

        @NotNull(message = "Type is required")
        RecordType type,

        @NotBlank(message = "Category is required")
        String category,

        @NotNull(message = "Date is required")
        LocalDateTime date,

        String notes
) {}