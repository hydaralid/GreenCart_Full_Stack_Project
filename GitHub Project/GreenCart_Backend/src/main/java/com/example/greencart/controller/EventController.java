package com.example.greencart.controller;

import com.example.greencart.entity.Event;
import com.example.greencart.repository.EventRepository;
import com.example.greencart.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/fetch")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Integer id) {
        return eventService.getEventById(id);
    }

    @PostMapping("/add")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Integer id, @RequestBody Event eventDetails) {
        return eventService.updateEvent(id, eventDetails);
    }


    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
    }

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/scheduled")
    public List<EventDTO> getScheduledEvents() {
        // Fetch scheduled events (events in the future)
        List<Event> events = eventRepository.findAll().stream()
                .filter(event -> event.getDate().isAfter(java.time.LocalDate.now()))
                .collect(Collectors.toList());

        return events.stream()
                .map(event -> new EventDTO(
                        event.getId(),
                        event.getName(),
                        event.getDate().toString(),
                        event.getAbout(),
                        event.getPlace(),
                        event.getTime().toString()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/previous")
    public List<PreviousEventDTO> getPreviousEvents() {
        // Get current date
        LocalDate currentDate = LocalDate.now();

        // Filter events that are strictly in the past (before today)
        List<Event> events = eventRepository.findAll().stream()
                .filter(event -> event.getDate().isBefore(currentDate))
                .collect(Collectors.toList());

        return events.stream()
                .map(event -> new PreviousEventDTO(
                        event.getId(),
                        event.getName(),
                        event.getDate().toString(),
                        event.getTime().toString(),
                        event.getPlace(),
                        event.getAbout()
                ))
                .collect(Collectors.toList());
    }

    // Data Transfer Objects
    public static class EventDTO {
        private Integer id;
        private String title;
        private String date;
        private String description;
        private String place;
        private String time;

        public EventDTO(Integer id, String title, String date, String description, String place, String time) {
            this.id = id;
            this.title = title;
            this.date = date;
            this.description = description;
            this.place = place;
            this.time = time;
        }

        // Getters
        public Integer getId() { return id; }
        public String getTitle() { return title; }
        public String getDate() { return date; }
        public String getDescription() { return description; }
        public String getPlace() { return place; }
        public String getTime() { return time; }
    }

    public static class PreviousEventDTO {
        private Integer id;
        private String title;
        private String date;
        private String time;
        private String place;
        private String description;

        public PreviousEventDTO(Integer id, String title, String date, String time, String place, String description) {
            this.id = id;
            this.title = title;
            this.date = date;
            this.time = time;
            this.place = place;
            this.description = description;
        }

        // Getters
        public Integer getId() { return id; }
        public String getTitle() { return title; }
        public String getDate() { return date; }
        public String getTime() { return time; }
        public String getPlace() { return place; }
        public String getDescription() { return description; }
    }

}

