package com.undamped.demo.controller;


import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.service.BindEventService;
import com.undamped.demo.service.BindEventServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BindEventController {

    @Autowired // Dependency injection
    private BindEventServiceImpl eventService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/bindevent/")
    @CrossOrigin(origins ="http://localhost:4200")
    public bind_eventlist saveBindEvent(@Valid @RequestBody bind_eventlist event){
        //  LOGGER.info("Save new bind event instance");
        return eventService.saveBindEvent(event);
    }

    // Get all districts from database
    @GetMapping("/bindevent/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<bind_eventlist> fetchBindEventList(){
        // LOGGER.info("Fetching all bound event instances");
        return eventService.fetchBindEventList();
    }



}

