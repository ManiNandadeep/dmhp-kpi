package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.repository.BindEventRepository;
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
class BindEventServiceTest {

    @Autowired
    private BindEventService bindEventService;

    // Mocked Repository Layer
    @MockBean
    private BindEventRepository bindEventRepository;

    @BeforeEach
    void setUp() {
        /*
        bind_eventlist bindEventlistInstance = bind_eventlist.builder().EventId(1L).EventName("test").build();
        Mockito.when(bindEventRepository.findAll()).thenReturn((List<bind_eventlist>) bindEventlistInstance);
         */
    }

    @Test
    // @DisplayName("Test case 1")
    public void whenBindEventFetch(){
        // Validation goes here
        List<bind_eventlist> found = bindEventService.fetchBindEventList();
        List<bind_eventlist> emptyList = Collections.emptyList();
        assertFalse(found.isEmpty());
    }
}
