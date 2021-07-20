package com.undamped.demo.controller;

import com.undamped.demo.entity.tbl_facility;
import com.undamped.demo.service.FacilityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class FacilityController {

    @Autowired // Dependency injection
    private FacilityServiceImpl facilityService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/facility/")
    @CrossOrigin(origins ="http://localhost:4200")
    public tbl_facility savefacility(@Valid @RequestBody tbl_facility facility) {
        //  LOGGER.info("Save new taluka instance");
        return facilityService.saveFacility(facility);
    }

    // Get all districts from database
    @GetMapping("/facility/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<tbl_facility> fetchFacilityList() {
        // LOGGER.info("Fetching all taluka instances");
        return facilityService.fetchFacilityList();
    }

}
