package com.undamped.demo.service;


import com.undamped.demo.entity.tbl_facility;
import com.undamped.demo.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FacilityServiceImpl implements FacilityService{

    @Autowired
    private FacilityRepository facilityRepository;


    @Override
    public tbl_facility saveFacility(tbl_facility facility) {
        return facilityRepository.save(facility);
    }

    @Override
    public List<tbl_facility> fetchFacilityList() {
        return facilityRepository.findAll();
    }
}

