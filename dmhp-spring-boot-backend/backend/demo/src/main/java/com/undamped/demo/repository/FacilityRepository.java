package com.undamped.demo.repository;

import com.undamped.demo.entity.tbl_facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityRepository extends JpaRepository<tbl_facility, Long> {
    // Add all DB methods not supported by in-built JPARepository functions.
}

