package com.undamped.demo.service;

import com.undamped.demo.entity.bind_eventlist;

import java.util.List;

public interface BindEventService {

    public bind_eventlist saveBindEvent(bind_eventlist event);

    public List<bind_eventlist> fetchBindEventList();

}

