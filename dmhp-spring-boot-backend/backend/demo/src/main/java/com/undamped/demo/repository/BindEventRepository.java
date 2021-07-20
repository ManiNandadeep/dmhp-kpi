package com.undamped.demo.repository;

import com.undamped.demo.entity.bind_eventlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BindEventRepository extends JpaRepository<bind_eventlist, Long> {
    // Add all DB methods not supported by in-built JPARepository functions.
}



