package com.undamped.demo.service;

import com.undamped.demo.entity.DistrictMini;
import com.undamped.demo.entity.Districts;

import java.util.List;

public interface DistrictService {

    public Districts saveDistrict(Districts district);

    public List<Districts> fetchDistrictList();

    public List<DistrictMini> fetchDistrictMini();
}

