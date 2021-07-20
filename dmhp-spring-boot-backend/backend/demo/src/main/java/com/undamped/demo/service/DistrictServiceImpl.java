package com.undamped.demo.service;

import com.undamped.demo.entity.DistrictMini;
import com.undamped.demo.entity.Districts;
import com.undamped.demo.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService{

    @Autowired
    private DistrictRepository districtRepository;


    @Override
    public Districts saveDistrict(Districts district) {
        return districtRepository.save(district);
    }

    @Override
    public List<Districts> fetchDistrictList() {
        return districtRepository.findAll();
    }

    @Override
    public List<DistrictMini> fetchDistrictMini(){
        return districtRepository.fetchDistrictMini();
    }

}