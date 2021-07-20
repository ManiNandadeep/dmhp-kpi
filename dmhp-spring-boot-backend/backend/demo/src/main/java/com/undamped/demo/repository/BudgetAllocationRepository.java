package com.undamped.demo.repository;

import com.undamped.demo.entity.tbl_budgetallocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetAllocationRepository extends JpaRepository<tbl_budgetallocation, Long>{

}
