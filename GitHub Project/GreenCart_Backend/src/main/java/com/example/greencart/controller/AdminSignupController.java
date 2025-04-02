package com.example.greencart.controller;

import com.example.greencart.entity.AdminSignup;
import com.example.greencart.service.AdminSignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminSignupController {

    @Autowired
    AdminSignupService adminSignupService;

    @PostMapping("/signup")
    public String addDetails(@RequestBody AdminSignup adminSignup) {
        return adminSignupService.addDetails(adminSignup);
    }

    @PostMapping("/login")
    public String login(@RequestBody AdminSignup loginRequest) {
        return adminSignupService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
