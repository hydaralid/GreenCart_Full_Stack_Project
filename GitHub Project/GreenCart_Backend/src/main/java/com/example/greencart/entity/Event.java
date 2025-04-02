package com.example.greencart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(nullable = false)
    private LocalDate date;  // Use LocalDate instead of String

    @Column(nullable = false)
    private LocalTime time;  // Use LocalTime instead of String

    private String place;

    @Column(columnDefinition = "TEXT")
    private String about;
}

