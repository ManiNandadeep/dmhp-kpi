package com.undamped.demo.service;


import com.undamped.demo.entity.tbl_budgetallocation;
import java.util.List;

public interface BudgetAllocationService {

    public tbl_budgetallocation saveBudgetAllocation(tbl_budgetallocation budgetallocation);

    public List<tbl_budgetallocation> fetchBudgetAllocationList();
}
