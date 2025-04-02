package com.example.greencart.repository;

import com.example.greencart.entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SignupRepository extends JpaRepository<Signup, Integer> {
    Optional<Signup> findByEmail(String email);
}
