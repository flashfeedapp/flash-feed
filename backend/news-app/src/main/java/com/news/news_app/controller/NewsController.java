package com.news.news_app.controller;

import com.news.news_app.dto.DailyNewsCacheDto;
import com.news.news_app.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/news/v1")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/national")
    public ResponseEntity<Object> getNationalNews(@RequestParam String deviceId){
        Object nationalNewsResponse = newsService.getNationalNews(deviceId);
        return new ResponseEntity<>(nationalNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/state")
    public Object getStateLevelNewsByState(@RequestParam String deviceId) {
        Object stateNewsResponse = newsService.getStateNewsByKeyword(deviceId);
        return new ResponseEntity<>(stateNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/world")
    public Object getWorldNews(@RequestParam String deviceId) {
        Object worldNewsResponse = newsService.getWorldNewsByLangAndCategory(deviceId);
        return new ResponseEntity<>(worldNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/business")
    public Object getBusinessNews(@RequestParam String deviceId) {
        Object businessNewsResponse = newsService.getBusinessNewsByLangAndCategory(deviceId);
        return new ResponseEntity<>(businessNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/health")
    public Object getHealthNews(@RequestParam String deviceId) {
        Object worldNewsResponse = newsService.getHealthNewsByLangAndCategory(deviceId);
        return new ResponseEntity<>(worldNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/technology")
    public Object getTechnologyNews(@RequestParam String deviceId) {
        Object worldNewsResponse = newsService.getTechnologyNewsByLangAndCategory(deviceId);
        return new ResponseEntity<>(worldNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/entertainment")
    public Object getEntertainmentNews(@RequestParam String deviceId) {
        Object entertainmentNewsResponse = newsService.getEntertainmentNewsByLangAndCategory(deviceId);
        return new ResponseEntity<>(entertainmentNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/language/telugu")
    public Object getTeluguNews() throws Exception {
        Object teluguNewsResponse = newsService.getTeluguLanguageNews();
        return new ResponseEntity<>(teluguNewsResponse, HttpStatus.OK);
    }

    @GetMapping("/language/hindi")
    public Object getHindiNews() throws Exception {
        Object hindiNewsResponse = newsService.getHindiLanguageNews();
        return new ResponseEntity<>(hindiNewsResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNews(@RequestBody DailyNewsCacheDto dailyNewsCacheDto) {
        Object object = newsService.addNewNews(dailyNewsCacheDto);
        return new ResponseEntity<>(object, HttpStatus.OK);
    }

    @PutMapping("/{newsId}")
    public ResponseEntity<?> updateNews(@PathVariable Long newsId, @RequestBody DailyNewsCacheDto dailyNewsCacheDto) throws Exception {
        Object object = newsService.updateNews(newsId, dailyNewsCacheDto);
        return new ResponseEntity<>(object, HttpStatus.OK);
    }

    @DeleteMapping("/{newsId}")
    public void deleteNews(@PathVariable Long newsId) {
        newsService.deleteNews(newsId);
    }
}
