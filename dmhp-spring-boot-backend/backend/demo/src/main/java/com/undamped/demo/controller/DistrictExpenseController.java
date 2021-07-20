package com.undamped.demo.controller;

import com.undamped.demo.entity.tbl_districtexpense;
import com.undamped.demo.service.DistrictExpenseServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class DistrictExpenseController {

    @Autowired // Dependency injection
    private DistrictExpenseServiceImpl districtExpenseService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new training and fetch it back
    @PostMapping("/districtexpense/")
    @CrossOrigin(origins ="http://localhost:4200")
    public tbl_districtexpense saveDistrictExpense(@Valid @RequestBody tbl_districtexpense de){
        //  LOGGER.info("Save new training instance");
        return districtExpenseService.saveDistrictExpense(de);
    }

    // Get all trainings from database
    @GetMapping("/districtexpense/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<tbl_districtexpense> fetchDistrictExpenseList(){
        // LOGGER.info("Fetching all training instances");
        return districtExpenseService.fetchDistrictExpenseList();
    }

}
