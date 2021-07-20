package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_districtexpense;
import com.undamped.demo.repository.DistrictExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DistrictExpenseServiceImpl implements DistrictExpenseService{

    @Autowired
    private DistrictExpenseRepository districtExpenseRepository;

    @Override
    public tbl_districtexpense saveDistrictExpense(tbl_districtexpense de) {
        return districtExpenseRepository.save(de);
    }

    @Override
    public List<tbl_districtexpense> fetchDistrictExpenseList() {
        return districtExpenseRepository.findAll();
    }
}
