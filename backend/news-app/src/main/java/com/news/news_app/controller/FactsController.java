package com.news.news_app.controller;

import com.news.news_app.entity.Facts;
import com.news.news_app.service.FactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
