package com.undamped.demo.service;

import com.undamped.demo.entity.tbl_training;
import com.undamped.demo.repository.TrainingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TrainingServiceImpl implements TrainingService{

    @Autowired
    private TrainingRepository trainingRepository;


    @Override
    public tbl_training saveTraining(tbl_training training) {
        return trainingRepository.save(training);
    }

    @Override
    public List<tbl_training> fetchTrainingList() {
        return trainingRepository.findAll();
    }
}


