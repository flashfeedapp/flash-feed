package com.news.news_app.controller;

import com.news.news_app.entity.DailyNewsCache;
import com.news.news_app.repository.DailyNewsCacheRepository;
import com.news.news_app.service.GeminiStoryService;
import com.news.news_app.service.LlamaStoryService;
import com.news.news_app.service.StoryService;
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
        List<DailyNewsCache> stories = storyRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("story", language);
        return stories;
    }
}
