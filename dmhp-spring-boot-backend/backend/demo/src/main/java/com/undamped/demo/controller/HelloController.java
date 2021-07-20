package com.undamped.demo.controller;


import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {

    private String[] retString = new String[] {"Welcome to Spring Boot!","Check out the entity package for more details","For a full list of routes, check out the controller package"};

    // Map GET request to this method
    @GetMapping("/")
    @CrossOrigin(origins ="http://localhost:4200")
    public String helloWorld(){
        return String.join(" | ",retString);
    }
}
