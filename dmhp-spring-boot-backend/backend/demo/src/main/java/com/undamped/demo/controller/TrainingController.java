package com.undamped.demo.controller;


import com.undamped.demo.entity.tbl_training;
import com.undamped.demo.service.TrainingService;
import com.undamped.demo.service.TrainingServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TrainingController {

    @Autowired // Dependency injection
    private TrainingServiceImpl trainingService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new training and fetch it back
    @PostMapping("/training/")
    @CrossOrigin(origins ="http://localhost:4200")
    public tbl_training saveTraining(@Valid @RequestBody tbl_training training){
        //  LOGGER.info("Save new training instance");
        return trainingService.saveTraining(training);
    }

    // Get all trainings from database
    @GetMapping("/training/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<tbl_training> fetchTrainingList(){
        // LOGGER.info("Fetching all training instances");
        return trainingService.fetchTrainingList();
    }



}

