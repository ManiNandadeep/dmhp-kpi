package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_taluka;
import com.undamped.demo.repository.TalukaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TalukaServiceImpl implements TalukaService{

    @Autowired
    private TalukaRepository talukaRepository;


    @Override
    public tbl_taluka saveTaluka(tbl_taluka taluka) {
        return talukaRepository.save(taluka);
    }

    @Override
    public List<tbl_taluka> fetchTalukaList() {
        return talukaRepository.findAll();
    }
}


