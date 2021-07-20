package com.undamped.demo.controller;

import com.undamped.demo.entity.tbl_budgetallocation;
import com.undamped.demo.service.BudgetAllocationService;
import com.undamped.demo.service.BudgetAllocationServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BudgetAllocationController {
    @Autowired // Dependency injection
    private BudgetAllocationServiceImpl budgetallocationService;

    // Logger
    //private final Logger LOGGER = LoggerFactory.getLogger( name = DepartmentController.class);

    // Add new district and fetch it back
    @PostMapping("/budgetallocation/")
    @CrossOrigin(origins ="http://localhost:4200")
    public tbl_budgetallocation saveBudgetAllocation(@Valid @RequestBody tbl_budgetallocation budgetallocation){
        //  LOGGER.info("Save new taluka instance");
        return budgetallocationService.saveBudgetAllocation(budgetallocation);
    }

    // Get all districts from database
    @GetMapping("/budgetallocation/")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<tbl_budgetallocation> fetchBudgetAllocationList(){
        // LOGGER.info("Fetching all taluka instances");
        return budgetallocationService.fetchBudgetAllocationList();
    }
}
