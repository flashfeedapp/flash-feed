package com.news.news_app.controller;

import com.news.news_app.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/jobs")
public class JobsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<Object> getJobs(){
        Object nationalNewsResponse = newsService.getJobs();
        return new ResponseEntity<>(nationalNewsResponse, HttpStatus.OK);
    }
}
