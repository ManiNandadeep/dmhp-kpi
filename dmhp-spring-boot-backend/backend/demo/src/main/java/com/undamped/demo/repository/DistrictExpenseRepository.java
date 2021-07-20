package com.undamped.demo.repository;

import com.undamped.demo.entity.tbl_districtexpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictExpenseRepository extends JpaRepository<tbl_districtexpense, Long> {
}
