package com.assignment.financedashboardsystem.service;

import com.assignment.financedashboardsystem.dto.response.DashboardSummaryResponse;
import com.assignment.financedashboardsystem.enums.RecordType;
import com.assignment.financedashboardsystem.repository.RecordRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock
    private RecordRepository recordRepository;

    @InjectMocks
    private DashboardService dashboardService;

    @Test
    @DisplayName("Should correctly calculate dashboard summary and net balance")
    void getSummary_CalculatesCorrectly() {
        // Arrange: Mock the database responses
        BigDecimal mockIncome = new BigDecimal("5000.00");
        BigDecimal mockExpense = new BigDecimal("1500.00");

        when(recordRepository.sumAmountByType(RecordType.INCOME)).thenReturn(mockIncome);
        when(recordRepository.sumAmountByType(RecordType.EXPENSE)).thenReturn(mockExpense);
        when(recordRepository.getExpenseCategoryTotals()).thenReturn(List.of()); // Empty list for simplicity

        // Act
        DashboardSummaryResponse result = dashboardService.getSummary();

        // Assert
        assertNotNull(result);
        assertEquals(mockIncome, result.totalIncome());
        assertEquals(mockExpense, result.totalExpenses());

        // 5000 - 1500 = 3500
        assertEquals(new BigDecimal("3500.00"), result.netBalance());
    }
}