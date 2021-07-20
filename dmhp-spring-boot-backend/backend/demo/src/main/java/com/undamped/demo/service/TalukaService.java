package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_taluka;

import java.util.List;

public interface TalukaService {

    public tbl_taluka saveTaluka(tbl_taluka taluka);

    public List<tbl_taluka> fetchTalukaList();

}

