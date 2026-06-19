package com.news.news_app.controller;

import com.news.news_app.entity.Facts;
import com.news.news_app.service.FactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/facts")
public class FactsController {

    @Autowired
    private FactsService factsService;

    @GetMapping
    public ResponseEntity<List<Facts>> getFacts(){
        List<Facts> facts = factsService.getFacts();
        return new ResponseEntity<>(facts, HttpStatus.OK);
    }

    @PostMapping
    public void addFacts(@RequestBody List<Facts> facts) {
        factsService.addFacts(facts);
    }
}
