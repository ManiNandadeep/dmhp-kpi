package com.undamped.demo.service;

import com.undamped.demo.entity.DistrictMini;
import com.undamped.demo.entity.Districts;
import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.repository.BindEventRepository;
import com.undamped.demo.repository.DistrictRepository;
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
class DistrictServiceTest {

    @Autowired
    private DistrictService districtService;

    // Mocked Repository Layer
    @MockBean
    private DistrictRepository districtRepository;

    @BeforeEach
    void setUp() {
        /*
        Make a similar entity to:
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);
         */
    }

    @Test
    // @DisplayName("Test case 5")
    public void whenBindEventFetch(){
        // Validation goes here
        List<Districts> found = districtService.fetchDistrictList();
        List<Districts> emptyList = Collections.emptyList();
        assertFalse(found.isEmpty());
    }

    @Test
    // @DisplayName("Test case 6")
    public void whenDistrictMiniFetch(){
        // Validation goes here
        List<DistrictMini> found = districtService.fetchDistrictMini();
        assertFalse(found.isEmpty());
    }
}


