package com.news.news_app.cron;

import com.news.news_app.entity.DailyNewsCache;
import com.news.news_app.repository.DailyNewsCacheRepository;
import com.news.news_app.service.LlamaStoryService;
import com.news.news_app.service.NewsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class NewsCronJob {

    @Autowired
    private NewsService newsService;

    @Autowired
    private DailyNewsCacheRepository dailyNewsCacheRepository;

    @Autowired
    private LlamaStoryService llamaStoryService;

    @Scheduled(cron = "0 20 05 * * *")
    @Transactional
    public void fetchAndStoreNews() {

        // Telugu language
        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Telangana", "te", "top"),
                "state",
                "te","Telangana", "India"
        );

        saveNews(
                newsService.fetchNationalNewsFromNewsData("in", "te", "top"),
                "national",
                "te",null,"India"
        );

        saveNews(
                newsService.fetchWorldNewsByLangAndCategoryFromNewsData("te", "world"),
                "world",
                "te", null, null
        );

        saveNews(
                newsService.fetchBusinessNewsByLanguageFromNewsData("te", "business"),
                "business",
                "te", null, null
        );

        saveNews(
                newsService.fetchHealthNewsByLanguageFromNewsData("te"),
                "health",
                "te", null, null
        );

        saveNews(
                newsService.fetchTechnologyNewsByLanguageFromNewsData("te"),
                "technology",
                "te", null, null
        );

        saveNews(
                newsService.fetchEntertainmentNewsByLanguageFromNewsData("te"),
                "entertainment",
                "te", null, null
        );

        // Hindi Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Telangana", "hi", "top"),
                "state",
                "hi", "Telangana", "India"
        );

        saveNews(
                newsService.fetchNationalNewsFromNewsData("in", "hi", "top"),
                "national",
                "hi",null,"India"
        );

        saveNews(
                newsService.fetchWorldNewsByLangAndCategoryFromNewsData("hi", "world"),
                "world",
                "hi", null, null
        );

        saveNews(
                newsService.fetchBusinessNewsByLanguageFromNewsData("hi", "business"),
                "business",
                "hi", null, null
        );

        saveNews(
                newsService.fetchHealthNewsByLanguageFromNewsData("hi"),
                "health",
                "hi", null, null
        );

        saveNews(
                newsService.fetchTechnologyNewsByLanguageFromNewsData("hi"),
                "technology",
                "hi", null, null
        );

        saveNews(
                newsService.fetchEntertainmentNewsByLanguageFromNewsData("hi"),
                "entertainment",
                "hi", null, null
        );

        // English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Telangana", "en", "top"),
                "state",
                "en", "Telangana", "India"
        );

        saveNews(
                newsService.fetchNationalNewsFromNewsData("in", "en", "top"),
                "national",
                "en",null,"India"
        );

        saveNews(
                newsService.fetchWorldNewsByLangAndCategoryFromNewsData("en", "world"),
                "world",
                "en", null, null
        );

        saveNews(
                newsService.fetchBusinessNewsByLanguageFromNewsData("en", "business"),
                "business",
                "en", null, null
        );

        saveNews(
                newsService.fetchHealthNewsByLanguageFromNewsData("en"),
                "health",
                "en", null, null
        );

        saveNews(
                newsService.fetchTechnologyNewsByLanguageFromNewsData("en"),
                "technology",
                "en", null, null
        );

        saveNews(
                newsService.fetchEntertainmentNewsByLanguageFromNewsData("en"),
                "entertainment",
                "en", null, null
        );

        // Telugu AP language
        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Andhra Pradesh", "te", "top"),
                "state",
                "te","Andhra Pradesh", "India"
        );

        // Hindi language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Andhra Pradesh", "hi", "top"),
                "state",
                "hi", "Andhra Pradesh", "India"
        );

        // English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Andhra Pradesh", "en", "top"),
                "state",
                "en", "Andhra Pradesh", "India"
        );

        // Delhi English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Delhi", "en", "top"),
                "state",
                "en", "Delhi", "India"
        );

        // Delhi Hindi Language
        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Delhi", "hi", "top"),
                "state",
                "hi", "Delhi", "India"
        );

        // Maharashtra English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Maharashtra", "en", "top"),
                "state",
                "en", "Maharashtra", "India"
        );

        // Maharashtra Hindi Language
        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Maharashtra", "hi", "top"),
                "state",
                "hi", "Maharashtra", "India"
        );

        // TamilNadu English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("TamilNadu", "en", "top"),
                "state",
                "en", "TamilNadu", "India"
        );

        // Karnataka English Language

        saveNews(
                newsService.fetchStateNewsByKeywordFromNewsData("Karnataka", "en", "top"),
                "state",
                "en", "Karnataka", "India"
        );
    }

    @Scheduled(cron = "0 20 05 * * *")
    @Transactional
    public void fetchAndStoreStory() {
        List<String> stories = llamaStoryService.generateStory("english");
        List<DailyNewsCache> storiesToSave = new ArrayList<>();

        stories.forEach(story -> {
            DailyNewsCache s = new DailyNewsCache();

            s.setTitle("English Bedtime Story");
            s.setSummary(story);
            s.setSource("Llama Ai");
            s.setCategory("story");
            s.setLanguage("english");
            s.setCreatedAt(LocalDateTime.now());
            storiesToSave.add(s);
        });

        //dailyNewsCacheRepository.deleteByCategory("story");
        dailyNewsCacheRepository.saveAll(storiesToSave);
    }

    private void saveNews(Object response, String category, String language, String state, String country) {

        Map<String, Object> map = (Map<String, Object>) response;
        List<Map<String, Object>> results =
                (List<Map<String, Object>>) map.getOrDefault("results", List.of());

        List<DailyNewsCache> entities = results.stream().map(item -> {
            DailyNewsCache e = new DailyNewsCache();
            e.setTitle((String) item.get("title"));
            e.setLink((String) item.get("link"));
            e.setSummary((String) item.get("description"));
            e.setImageUrl((String) item.get("image_url"));
            e.setSource((String) item.get("source_name"));
            e.setCategory(category);
            e.setLanguage(language);
            e.setState(state);
            e.setCountry(country);
            String pubDate = (String) item.get("pubDate");

            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            e.setPublishedAt(LocalDateTime.parse(pubDate, formatter));
            e.setCreatedAt(LocalDateTime.now());
            return e;
        }).toList();

        dailyNewsCacheRepository.saveAll(entities);
    }
}
