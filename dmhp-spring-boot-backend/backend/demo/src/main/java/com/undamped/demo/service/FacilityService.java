package com.undamped.demo.service;


import com.undamped.demo.entity.tbl_facility;

import java.util.List;

public interface FacilityService {

    public tbl_facility saveFacility(tbl_facility facility);

    public List<tbl_facility> fetchFacilityList();

}
