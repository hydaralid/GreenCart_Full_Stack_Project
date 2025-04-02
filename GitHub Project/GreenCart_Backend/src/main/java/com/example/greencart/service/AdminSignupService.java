package com.example.greencart.service;

import com.example.greencart.entity.AdminSignup;
import com.example.greencart.repository.AdminSignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class AdminSignupService {

    @Autowired
    AdminSignupRepository adminSignupRepository;

    public String addDetails(AdminSignup adminSignup) {
        adminSignupRepository.save(adminSignup);
        return "success";
    }

    public String authenticateUser(String email, String password) {
        Optional<AdminSignup> user = adminSignupRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful!";
        }
        return "Invalid emailId or password!";
    }

}
