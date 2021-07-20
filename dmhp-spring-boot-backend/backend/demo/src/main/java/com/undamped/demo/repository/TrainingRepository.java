package com.undamped.demo.repository;

import com.undamped.demo.entity.tbl_training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<tbl_training, Long> {
    // Add all DB methods not supported by in-built JPARepository functions.
}



