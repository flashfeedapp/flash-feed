package com.news.news_app.service;

import com.news.news_app.entity.Greeting;
import com.news.news_app.repository.GreetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class GreetingService {

    @Autowired
    private GreetingRepository repository;

    public Greeting save(Greeting greeting) {
        greeting.setCreatedAt(LocalDateTime.now());
        return repository.save(greeting);
    }

    public Optional<Greeting> getActiveGreeting() {
        return repository.findFirstByActiveTrueOrderByGreetingDateDesc();
    }

    public void deactivateAll() {
        repository.findAll().forEach(g -> {
            g.setActive(false);
            repository.save(g);
        });
    }
}
