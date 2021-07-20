package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_budgetallocation;
import com.undamped.demo.repository.BudgetAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BudgetAllocationServiceImpl implements BudgetAllocationService {

    @Autowired
    private BudgetAllocationRepository budgetAllocationRepository;


    @Override
    public tbl_budgetallocation saveBudgetAllocation(tbl_budgetallocation budgetallocation) {
        return budgetAllocationRepository.save(budgetallocation);
    }

    @Override
    public List<tbl_budgetallocation> fetchBudgetAllocationList() {
        return budgetAllocationRepository.findAll();
    }
}
