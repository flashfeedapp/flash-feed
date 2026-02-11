package com.news.news_app.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "newsdata", url = "https://newsdata.io/api/1/latest?apikey=pub_5d1d04d1f08d40779ad0d4ad316e5245")
public interface NewsDataClient {

    @GetMapping
    public Object getStateNewsByKeyword(@RequestParam("q") String keyword,@RequestParam String language,@RequestParam String category);

    @GetMapping
    public Object getNationalNewsByCountryAndLanguage(@RequestParam String country,@RequestParam String language,@RequestParam String category);

    @GetMapping
    Object getWorldNews(@RequestParam String language,@RequestParam String category);

    @GetMapping
    Object getHealthNews(@RequestParam("q") String keyword,@RequestParam String language);

    @GetMapping
    Object getBusinessNews(@RequestParam String language,@RequestParam String category);

    @GetMapping
    Object getEntertainmentNews(@RequestParam String language,@RequestParam String category);

    @GetMapping
    Object getTechnologyNews(@RequestParam String language,@RequestParam String category);

}
