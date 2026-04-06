package com.assignment.financedashboardsystem.repository;

import com.assignment.financedashboardsystem.entity.FinancialRecord;
import com.assignment.financedashboardsystem.enums.RecordType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface RecordRepository extends JpaRepository<FinancialRecord, UUID> {

    Page<FinancialRecord> findAllByIsDeletedFalse(Pageable pageable);

    @Query("SELECT COALESCE(SUM(f.amount), 0) FROM FinancialRecord f WHERE f.type = :type AND f.isDeleted = false")
    BigDecimal sumAmountByType(@Param("type") RecordType type);

    @Query("SELECT f.category AS category, SUM(f.amount) AS total FROM FinancialRecord f WHERE f.type = 'EXPENSE' AND f.isDeleted = false GROUP BY f.category")
    List<CategoryTotalProjection> getExpenseCategoryTotals();

    interface CategoryTotalProjection {
        String getCategory();
        BigDecimal getTotal();
    }
}