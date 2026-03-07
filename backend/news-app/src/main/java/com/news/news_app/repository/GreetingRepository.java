package com.news.news_app.repository;

import com.news.news_app.entity.Greeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GreetingRepository extends JpaRepository<Greeting, Long> {
    Optional<Greeting> findFirstByActiveTrueOrderByGreetingDateDesc();
}
