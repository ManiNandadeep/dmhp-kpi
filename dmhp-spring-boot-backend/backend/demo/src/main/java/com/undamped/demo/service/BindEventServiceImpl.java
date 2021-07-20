package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;
import com.undamped.demo.repository.BindEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BindEventServiceImpl implements BindEventService{

    @Autowired
    private BindEventRepository eventRepository;


    @Override
    public bind_eventlist saveBindEvent(bind_eventlist event) {
        return eventRepository.save(event);
    }

    @Override
    public List<bind_eventlist> fetchBindEventList() {
        return eventRepository.findAll();
    }
}


