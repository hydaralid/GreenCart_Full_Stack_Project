package com.example.greencart.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email_id;
    private String password;
}
