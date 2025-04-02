package com.example.greencart.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "adminsignup") // Ensure this matches your actual DB table
public class AdminSignup {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(nullable = false)
        private String name;

        @Column(nullable = false, unique = true)  // Email must be unique
        private String email;

        @Column(nullable = false)
        private String password;

}

