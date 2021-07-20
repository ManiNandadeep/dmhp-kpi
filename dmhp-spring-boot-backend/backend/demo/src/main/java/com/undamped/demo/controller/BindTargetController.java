package com.undamped.demo.controller;


import com.undamped.demo.entity.bind_targetgroup;
import com.undamped.demo.service.BindTargetService;
import com.undamped.demo.service.BindTargetServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BindTargetController {

    @Autowired // Dependency injection
    private BindTargetServiceImpl targetService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/bindtargetgroup/")
    @CrossOrigin(origins ="http://localhost:4200")
    public bind_targetgroup putTargetGroup(@Valid @RequestBody bind_targetgroup group){
        //  LOGGER.info("Save new bind target group instance");
        return targetService.putTargetGroup(group);
    }

    // Get all districts from database
    @GetMapping("/bindtargetgroup/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<bind_targetgroup> fetchTargetGroupList(){
        // LOGGER.info("Fetching all bound target group instances");
        return targetService.fetchTargetGroupList();
    }



}

