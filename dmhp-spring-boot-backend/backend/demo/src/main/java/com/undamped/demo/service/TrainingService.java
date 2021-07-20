package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_training;

import java.util.List;

public interface TrainingService {

    public tbl_training saveTraining(tbl_training training);

    public List<tbl_training> fetchTrainingList();

}

