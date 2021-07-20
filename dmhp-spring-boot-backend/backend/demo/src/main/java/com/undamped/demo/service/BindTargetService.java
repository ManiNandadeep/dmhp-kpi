package com.undamped.demo.service;

import com.undamped.demo.entity.bind_targetgroup;

import java.util.List;

public interface BindTargetService {

    public bind_targetgroup putTargetGroup(bind_targetgroup group);

    public List<bind_targetgroup> fetchTargetGroupList();

}

