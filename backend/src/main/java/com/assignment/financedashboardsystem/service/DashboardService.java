package com.assignment.financedashboardsystem.service;

import com.assignment.financedashboardsystem.dto.response.CategoryTotalDTO;
import com.assignment.financedashboardsystem.dto.response.DashboardSummaryResponse;
import com.assignment.financedashboardsystem.enums.RecordType;
import com.assignment.financedashboardsystem.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final RecordRepository recordRepository;

    public DashboardSummaryResponse getSummary() {
        BigDecimal income = recordRepository.sumAmountByType(RecordType.INCOME);
        BigDecimal expense = recordRepository.sumAmountByType(RecordType.EXPENSE);
        BigDecimal net = income.subtract(expense);

        List<CategoryTotalDTO> breakdown = recordRepository.getExpenseCategoryTotals()
                .stream()
                .map(p -> new CategoryTotalDTO(p.getCategory(), p.getTotal()))
                .toList();

        return new DashboardSummaryResponse(income, expense, net, breakdown);
    }
}