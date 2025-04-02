package com.example.greencart.controller;

import com.example.greencart.entity.Product;
import com.example.greencart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<String> addDetails(
            @RequestParam("name") String name,
            @RequestParam("brand") String brand,
            @RequestParam("price") Integer price,
            @RequestParam("about") String about,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {

        try {
            Product product = new Product();
            product.setName(name);
            product.setBrand(brand);
            product.setPrice(price);
            product.setAbout(about);
            product.setDescription(description);
            product.setImage(image.getBytes()); // Convert image to bytes for DB storage

            productService.addDetails(product);
            return ResponseEntity.ok("Product added successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving product: " + e.getMessage());
        }
    }

    @GetMapping("/fetch")
    public List<Product> fetchDetails(){
        return productService.getDetails();
    }




}
