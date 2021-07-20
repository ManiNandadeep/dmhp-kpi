package com.undamped.demo.controller;


import com.undamped.demo.entity.tbl_taluka;
import com.undamped.demo.service.TalukaService;
import com.undamped.demo.service.TalukaServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class TalukaController {

    @Autowired // Dependency injection
    private TalukaServiceImpl talukaService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/taluka/")
    @CrossOrigin(origins ="http://localhost:4200")
    public tbl_taluka saveTaluka(@Valid @RequestBody tbl_taluka taluka){
        //  LOGGER.info("Save new taluka instance");
        return talukaService.saveTaluka(taluka);
    }

    // Get all districts from database
    @GetMapping("/taluka/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<tbl_taluka> fetchTalukaList(){
        // LOGGER.info("Fetching all taluka instances");
        return talukaService.fetchTalukaList();
    }



}

