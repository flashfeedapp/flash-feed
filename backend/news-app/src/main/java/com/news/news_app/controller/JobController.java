package com.news.news_app.controller;

import com.news.news_app.entity.Job;
import com.news.news_app.service.JobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {

    @Autowired
    private JobsService jobsService;

    @GetMapping
    public List<Job> getAllJobs(){
        return jobsService.getAllJobs();
    }
}
