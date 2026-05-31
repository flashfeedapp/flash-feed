package com.news.news_app.controller;

import com.news.news_app.entity.DailyNewsCache;
import com.news.news_app.repository.DailyNewsCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/story")
public class StoryController {

    @Autowired
    private DailyNewsCacheRepository storyRepository;

    @GetMapping
    public Object getStoryByLanguage(@RequestParam String language) {
        List<DailyNewsCache> stories = storyRepository.findTop20ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("story", language);
        return stories;
    }
}
