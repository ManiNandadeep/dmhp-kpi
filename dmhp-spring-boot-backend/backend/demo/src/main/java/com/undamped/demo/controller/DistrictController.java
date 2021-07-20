package com.undamped.demo.controller;


import com.undamped.demo.entity.DistrictMini;
import com.undamped.demo.entity.Districts;
import com.undamped.demo.service.DistrictService;
import com.undamped.demo.service.DistrictServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@RestController
public class DistrictController {

    @Autowired // Dependency injection
    private DistrictServiceImpl districtService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/district/")
    @CrossOrigin(origins ="http://localhost:4200")
    public Districts saveDistrict(@Valid @RequestBody Districts district){
        //  LOGGER.info("Save new district instance");
        return districtService.saveDistrict(district);
    }

    // Get all districts from database
    @GetMapping("/district/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<Districts> fetchDistrictList(){
        // LOGGER.info("Fetching all district instances");
        return districtService.fetchDistrictList();
    }

    @GetMapping("/districtmini/")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<DistrictMini> fetchDistrictMini(){
        return districtService.fetchDistrictMini();
    }



}
