package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.entity.bind_targetgroup;
import com.undamped.demo.repository.BindEventRepository;
import com.undamped.demo.repository.BindTargetRepository;
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
class BindTargetServiceTest {

    @Autowired
    private BindTargetService bindTargetService;

    // Mocked Repository Layer
    @MockBean
    private BindTargetRepository bindTargetRepository;

    @BeforeEach
    void setUp() {
        /*

        Make a similar entity to:
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);

         */
    }

    @Test
    // @DisplayName("Test case 2")
    public void whenBindTargetFetch(){
        // Validation goes here
        List<bind_targetgroup> found = bindTargetService.fetchTargetGroupList();
        List<bind_targetgroup> emptyList = Collections.emptyList();
        assertFalse(found.isEmpty());
    }
}
