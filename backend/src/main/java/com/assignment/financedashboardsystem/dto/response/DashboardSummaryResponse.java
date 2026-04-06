package com.assignment.financedashboardsystem.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record DashboardSummaryResponse(
        BigDecimal totalIncome,
        BigDecimal totalExpenses,
        BigDecimal netBalance,
        List<CategoryTotalDTO> categoryBreakdown
) {}