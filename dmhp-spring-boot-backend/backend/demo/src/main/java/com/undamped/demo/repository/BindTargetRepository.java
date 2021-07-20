package com.undamped.demo.repository;

import com.undamped.demo.entity.bind_targetgroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BindTargetRepository extends JpaRepository<bind_targetgroup, Long> {
    // Add all DB methods not supported by in-built JPARepository functions.
}



