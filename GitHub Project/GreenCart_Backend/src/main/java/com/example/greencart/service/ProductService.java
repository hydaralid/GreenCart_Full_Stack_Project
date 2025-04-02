package com.example.greencart.service;

import com.example.greencart.entity.Product;
import com.example.greencart.repository.ProductRepository;
import com.example.greencart.repository.SignupRepository;
import com.example.greencart.entity.Signup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getDetails() {
        return productRepository.findAll();
    }

    public String addDetails(Product product) {
        productRepository.save(product);
        return "success";
    }


    public List<Product> getAllOrders() {
        return productRepository.findAll();
    }


}
