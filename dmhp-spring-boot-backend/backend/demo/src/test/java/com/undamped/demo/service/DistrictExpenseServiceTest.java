package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.entity.tbl_districtexpense;
import com.undamped.demo.repository.BindEventRepository;
import com.undamped.demo.repository.DistrictExpenseRepository;
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
class DistrictExpenseServiceTest {

    @Autowired
    private DistrictExpenseService districtExpenseService;

    // Mocked Repository Layer
    @MockBean
    private DistrictExpenseRepository districtExpenseRepository;

    @BeforeEach
    void setUp() {
        /*
        Make a similar entity to:
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);
         */
    }

    @Test
    // @DisplayName("Test case 4")
    public void whenDistrictExpenseFetch(){
        // Validation goes here
        List<tbl_districtexpense> found = districtExpenseService.fetchDistrictExpenseList();
        List<tbl_districtexpense> emptyList = Collections.emptyList();
        assertFalse(found.isEmpty());
    }
}


