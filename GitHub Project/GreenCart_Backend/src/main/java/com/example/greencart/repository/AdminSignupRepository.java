package com.example.greencart.repository;

import com.example.greencart.entity.AdminSignup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminSignupRepository extends JpaRepository<AdminSignup, Integer> {
    Optional<AdminSignup> findByEmail(String email);
}
