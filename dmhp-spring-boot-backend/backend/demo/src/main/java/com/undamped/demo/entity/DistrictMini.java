package com.undamped.demo.entity;

import javax.persistence.Table;

/*

    Min Queries:
    DistrictID
    StateID
    District

     */
public interface DistrictMini {
    String getDistrictID();
    String getStateId();
    String getDistrict();
}
