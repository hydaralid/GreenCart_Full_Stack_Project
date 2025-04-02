package com.example.greencart.controller;

import com.example.greencart.entity.Orders;
import com.example.greencart.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrdersController {

        @Autowired
        OrdersService ordersService;

        @GetMapping("/fetch")
        public List<Orders> getDetails()
        {
            return ordersService.getDetails();
        }

        @PostMapping("/add")
        public String addDetails(@RequestBody Orders orders)
        {
            return ordersService.addOrders(orders);
        }
}
