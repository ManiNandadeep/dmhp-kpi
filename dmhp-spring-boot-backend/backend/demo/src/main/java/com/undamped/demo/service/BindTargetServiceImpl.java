package com.undamped.demo.service;

import com.undamped.demo.entity.bind_targetgroup;
import com.undamped.demo.repository.BindTargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BindTargetServiceImpl implements BindTargetService{

    @Autowired
    private BindTargetRepository targetRepository;


    @Override
    public bind_targetgroup putTargetGroup(bind_targetgroup group) {
        return targetRepository.save(group);
    }

    @Override
    public List<bind_targetgroup> fetchTargetGroupList() {
        return targetRepository.findAll();
    }
}


