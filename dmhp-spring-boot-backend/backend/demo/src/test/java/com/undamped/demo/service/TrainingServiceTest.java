package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.entity.tbl_training;
import com.undamped.demo.repository.BindEventRepository;
import com.undamped.demo.repository.TrainingRepository;
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
class TrainingServiceTest {

    @Autowired
    private TrainingService trainingService;

    // Mocked Repository Layer
    @MockBean
    private TrainingRepository trainingRepository;

    @BeforeEach
    void setUp() {
        /*
        Make a similar entity to:
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);
         */
    }

    @Test
    // @DisplayName("Test case 9")
    public void whenTrainingFetch() {
        // Validation goes here
        List<tbl_training> found = trainingService.fetchTrainingList();
        List<tbl_training> emptyList = Collections.emptyList();
       // assertFalse(found.isEmpty());
    }

}


