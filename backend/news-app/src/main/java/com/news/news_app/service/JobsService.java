package com.news.news_app.service;

import com.news.news_app.entity.Job;
import com.news.news_app.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs(){
        return jobRepository.findAllByOrderByCreatedAtDesc();
    }
}
