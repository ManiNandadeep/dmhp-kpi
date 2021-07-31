package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.entity.tbl_facility;
import com.undamped.demo.repository.BindEventRepository;
import com.undamped.demo.repository.FacilityRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.hamcrest.CoreMatchers.is;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FacilityServiceTest {

    @Autowired
    private FacilityService facilityService;

    // Mocked Repository Layer
    @MockBean
    private FacilityRepository facilityRepository;

    @BeforeEach
    void setUp() {
        /*
        Make a similar entity to:
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);
         */
    }

    @Test
    // @DisplayName("Test case 7")
    public void whenFacilityFetch(){
        // Validation goes here
        List<tbl_facility> found = facilityService.fetchFacilityList();
        List<tbl_facility> emptyList = Collections.emptyList();
        //assertFalse(found.isEmpty());
    }
}


