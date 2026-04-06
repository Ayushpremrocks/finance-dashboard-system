package com.assignment.financedashboardsystem.dto.response;

import java.math.BigDecimal;

public record CategoryTotalDTO(
        String category,
        BigDecimal total
) {}