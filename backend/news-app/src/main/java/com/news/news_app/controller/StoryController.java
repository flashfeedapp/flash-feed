package com.news.news_app.controller;

import com.news.news_app.entity.DailyNewsCache;
import com.news.news_app.entity.Story;
import com.news.news_app.repository.DailyNewsCacheRepository;
import com.news.news_app.repository.StoryRepository;
import com.news.news_app.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/story")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private StoryService storyService;

    @GetMapping
    public Object getStoryByLanguage(@RequestParam String language) {
        return storyRepository.findTop10ByLanguage(language);
    }

    @PostMapping
    public void addStories(@RequestBody List<Story> stories) {
        storyService.addStories(stories);
    }
}
