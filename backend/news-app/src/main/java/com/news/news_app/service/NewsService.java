package com.news.news_app.service;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.news.news_app.client.CurrentsApiClient;
import com.news.news_app.client.GNewsClient;
import com.news.news_app.client.NewsDataClient;
import com.news.news_app.dto.DailyNewsCacheDto;
import com.news.news_app.entity.DailyNewsCache;
import com.news.news_app.entity.Users;
import com.news.news_app.mapper.DailyNewsCacheMapper;
import com.news.news_app.repository.DailyNewsCacheRepository;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private GNewsClient gNewsClient;

    @Autowired
    private NewsDataClient newsDataClient;

    @Autowired
    private CurrentsApiClient currentsApiClient;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${newsdata.api.key}")
    private String apikey;

    @Autowired
    private DailyNewsCacheRepository dailyNewsCacheRepository;

    @Autowired
    private UserService userService;

    public Object getNationalNews(String language, String country, String deviceId) throws Exception {
        //return gNewsClient.getNationalNewsByGNews("nation","en", "None",1,"in");
        //return newsDataClient.getNationalNewsByCountryAndLanguage(country,language, category);

        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("national", language);
    }

    public Object getStateNewsByKeyword(String state, String language, String country, String deviceId) throws Exception {
        //return newsDataClient.getStateNewsByKeyword(keyword,language, category);
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
            state = user.getState();
            country = user.getCountry();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseAndStateIgnoreCaseAndCountryIgnoreCaseOrderByPublishedAtDesc("state", language, state, country);
    }

    public Object getWorldNewsByLangAndCategory(String language, String deviceId) throws Exception {
        //return newsDataClient.getWorldNews(language,category);
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("world", language);
    }

    public Object fetchNationalNewsFromNewsData(String country, String language, String category) {
        //return gNewsClient.getNationalNewsByGNews("nation","en", "None",1,"in");
        return newsDataClient.getNationalNewsByCountryAndLanguage(country,language, category);
    }

    public Object fetchStateNewsByKeywordFromNewsData(String keyword, String language, String category) {
        return newsDataClient.getStateNewsByKeyword(keyword,language, category);
    }

    public Object fetchWorldNewsByLangAndCategoryFromNewsData(String language, String category) {
        return newsDataClient.getWorldNews(language,category);
    }

    public Object getBusinessNewsByLangAndCategory(String language, String deviceId) throws Exception {
        //return newsDataClient.getBusinessNews(language,"business");
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("business", language);
    }

    public Object getHealthNewsByLangAndCategory(String language, String deviceId) throws Exception {
        //return currentsApiClient.getHealthNews(language,category);
        //return newsDataClient.getHealthNews("health", "te");
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("health", language);
    }

    public Object getTechnologyNewsByLangAndCategory(String language, String deviceId) throws Exception {
        //return newsDataClient.getTechnologyNews(language,"technology");
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("technology",language);
    }

    public Object getEntertainmentNewsByLangAndCategory(String language, String deviceId) throws Exception {
        //return newsDataClient.getEntertainmentNews(language,"entertainment");
        if (StringUtils.isNotEmpty(deviceId)) {
            Users user = userService.getUserDetails(deviceId);
            language = user.getLanguage();
        }
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("entertainment",language);
    }

    public Object getTeluguLanguageNews() throws Exception {
        //String xmlResponse = restTemplate.getForObject("https://telugu.oneindia.com/rss/feeds/telugu-news-fb.xml", String.class);
        XmlMapper xmlMapper = new XmlMapper();
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36");
        headers.set("Accept", "application/rss+xml, application/xml, text/xml");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://telugu.oneindia.com/rss/feeds/telugu-news-fb.xml",
                HttpMethod.GET,
                entity,
                String.class
        );
        Map<String,Object> rssDataResponse = xmlMapper.readValue(response.getBody(), Map.class);

        return rssDataResponse.get("channel");
    }

    public Object getHindiLanguageNews() throws Exception {
        String xmlResponse = restTemplate.getForObject("https://feeds.feedburner.com/ndtvkhabar-latest", String.class);
        XmlMapper xmlMapper = new XmlMapper();
        Map<String,Object> rssDataResponse = xmlMapper.readValue(xmlResponse, Map.class);

        return rssDataResponse.get("channel");
    }

    public String fetchNews() {
        String url = "https://newsdata.io/api/1/news"
                + "?apikey=" + "pub_5d1d04d1f08d40779ad0d4ad316e5245"
                + "q=" + "Telangana"
                + "&category=" + "top"
                + "&language=" + "te";

        return restTemplate.getForObject(url, String.class);
    }

    public Object fetchBusinessNewsByLanguageFromNewsData(String language, String category) {
        return newsDataClient.getBusinessNews(language,category);
    }

    public Object fetchHealthNewsByLanguageFromNewsData(String language) {
        return newsDataClient.getHealthNews("health", language);
    }

    public Object fetchTechnologyNewsByLanguageFromNewsData(String language) {
        return newsDataClient.getTechnologyNews(language,"technology");
    }

    public Object fetchEntertainmentNewsByLanguageFromNewsData(String language) {
        return newsDataClient.getEntertainmentNews(language,"entertainment");
    }

    public Object addNewNews(DailyNewsCacheDto dailyNewsCacheDto) {
        dailyNewsCacheDto.setCreatedAt(LocalDateTime.now());
        DailyNewsCache dailyNewsCache = DailyNewsCacheMapper.toEntity(dailyNewsCacheDto);
        return dailyNewsCacheRepository.save(dailyNewsCache);
    }

    public Object updateNews(Long newsId, DailyNewsCacheDto dailyNewsCacheDto) throws Exception {
        Optional<DailyNewsCache> dailyNewsCache = dailyNewsCacheRepository.findById(newsId);
        if(dailyNewsCache.isPresent()) {
            DailyNewsCache dailyNewsCacheToSave = DailyNewsCacheMapper.toEntity(dailyNewsCacheDto);
            return dailyNewsCacheRepository.save(dailyNewsCacheToSave);
        } else {
            throw new Exception("DailyNews does not exist with provided id");
        }
    }

    public void deleteNews(Long newsId) {
        dailyNewsCacheRepository.deleteById(newsId);
    }

    public Object fetchJobsNewsByLangAndCategoryFromNewsData(String language, String category) {
        return newsDataClient.getJobsNews("job alerts", language, category);
    }

    public Object getJobsNewsByLangAndCategory(String deviceId) throws Exception {
        Users user =userService.getUserDetails(deviceId);
        return dailyNewsCacheRepository.findTop10ByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc("jobs",user.getLanguage());
    }
}
