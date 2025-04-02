package com.example.greencart.repository;

import com.example.greencart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer>
{
    // You can add custom query methods here if needed
}
