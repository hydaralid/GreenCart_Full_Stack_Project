package com.example.greencart.service;

import com.example.greencart.repository.SignupRepository;
import com.example.greencart.entity.Signup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class SignupService {

    @Autowired
    SignupRepository signupRepository;

    public String addDetails(Signup signup) {
        signupRepository.save(signup);
        return "success";
    }

    public String authenticateUser(String email, String password) {
        Optional<Signup> user = signupRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful!";
        }
        return "Invalid emailId or password!";
    }
}
