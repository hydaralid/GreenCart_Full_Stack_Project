package com.example.greencart.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AdminLoginRequest {
        private String email;
        private String password;

        // Getters, setters, constructors
        public AdminLoginRequest(String email, String password) {
                this.email = email;
                this.password = password;
        }


}
