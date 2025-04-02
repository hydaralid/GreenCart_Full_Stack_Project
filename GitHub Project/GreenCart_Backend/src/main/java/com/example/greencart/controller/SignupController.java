package com.example.greencart.controller;

import com.example.greencart.service.SignupService;
import com.example.greencart.entity.Signup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/register")
public class SignupController {

    @Autowired
    SignupService signupService;

    @PostMapping("/signup")
    public String addDetails(@RequestBody Signup signup) {
        return signupService.addDetails(signup);
    }

    @PostMapping("/login")
    public String login(@RequestBody Signup loginRequest) {
        return signupService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
