package com.example.greencart.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cartitems;
    private Integer totalamount;
    private Integer paymentmethod;
    private String name;
    private String cardnumber;
    private String expirydate; // Storing as a string in MM/YY format
    private String cvv;
}