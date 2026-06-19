package com.news.news_app.service;

import com.news.news_app.entity.Job;
import com.news.news_app.entity.Users;
import com.news.news_app.repository.JobRepository;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserService userService;

    public List<Job> getAllJobs(String deviceId, String language) throws Exception {
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return jobRepository.findJobsAndNews(language);
    }
}
