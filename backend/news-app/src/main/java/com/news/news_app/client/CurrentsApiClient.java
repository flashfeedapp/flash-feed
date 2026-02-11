package com.news.news_app.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "currentsApi",url = "https://api.currentsapi.services/v1/search?apiKey=i_5d2qinZ8JCZkKL0_7NmASTd0g_gSDlGPBCQPMovUlNghLU")
public interface CurrentsApiClient {

    @GetMapping
    public Object getWorldNews(@RequestParam String language, @RequestParam String category);


    @GetMapping
    Object getBusinessNews(@RequestParam String language, @RequestParam String category);

    @GetMapping
    Object getHealthNews(@RequestParam String language, @RequestParam String category);

    @GetMapping
    Object getTechnologyNews(@RequestParam String language, @RequestParam String category);

    @GetMapping
    Object getEntertainmentNews(@RequestParam String language, @RequestParam String category);
}
