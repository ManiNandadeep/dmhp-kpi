package com.undamped.demo.repository;

import com.undamped.demo.entity.DistrictMini;
import com.undamped.demo.entity.Districts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<Districts, Long> {

    // Add all DB methods not supported by in-built JPARepository functions.

    @Query(value = "SELECT DistrictID,StateID,District FROM Districts", nativeQuery = true)
    public List<DistrictMini> fetchDistrictMini();

}
