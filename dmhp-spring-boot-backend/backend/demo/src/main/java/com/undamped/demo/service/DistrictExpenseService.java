package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_districtexpense;


import java.util.List;

public interface DistrictExpenseService {

    public tbl_districtexpense saveDistrictExpense(tbl_districtexpense de);

    public List<tbl_districtexpense> fetchDistrictExpenseList();
}
