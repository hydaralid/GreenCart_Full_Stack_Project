package com.example.greencart.service;

import com.example.greencart.entity.Orders;
import com.example.greencart.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    public String addOrders(Orders orders) {
        ordersRepository.save(orders);
        return "Order added successfully";
    }

    public List<Orders> getDetails() {
        return ordersRepository.findAll();
    }
}
