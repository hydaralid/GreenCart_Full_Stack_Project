package com.example.greencart.service;

import com.example.greencart.entity.Event;
import com.example.greencart.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Integer id, Event eventDetails) {
        return eventRepository.findById(id).map(event -> {
            event.setName(eventDetails.getName());
            event.setDate(eventDetails.getDate());
            event.setTime(eventDetails.getTime());
            event.setPlace(eventDetails.getPlace());
            event.setAbout(eventDetails.getAbout());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }


    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }
}
