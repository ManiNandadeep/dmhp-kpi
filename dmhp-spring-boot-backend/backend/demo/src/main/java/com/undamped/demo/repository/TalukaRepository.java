package com.undamped.demo.repository;

import com.undamped.demo.entity.tbl_taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalukaRepository extends JpaRepository<tbl_taluka, Long> {
    // Add all DB methods not supported by in-built JPARepository functions.
}



