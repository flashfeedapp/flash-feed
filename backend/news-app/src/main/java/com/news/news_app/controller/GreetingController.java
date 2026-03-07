package com.news.news_app.controller;

import com.news.news_app.entity.Greeting;
import com.news.news_app.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/greetings")
public class GreetingController {

    @Autowired
    private GreetingService service;

    // Admin create greeting
    @PostMapping("/admin")
    public Greeting createGreeting(@RequestBody Greeting greeting) {
        return service.save(greeting);
    }

    // Public get active greeting
    @GetMapping("/active")
    public ResponseEntity<Greeting> getActiveGreeting() {
        return service.getActiveGreeting()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    // Admin deactivate all
    @PutMapping("/admin/deactivate")
    public void deactivateAll() {
        service.deactivateAll();
    }
}
