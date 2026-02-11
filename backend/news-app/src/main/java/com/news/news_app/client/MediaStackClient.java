package com.news.news_app.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "mediastack", url = "https://newsdata.io/api/v1/latest?apikey=pub_5d1d04d1f08d40779ad0d4ad316e5245")
public interface MediaStackClient {

    @GetMapping
    public Object getNationalNewsByMediaStackApi(@RequestParam String country, @RequestParam String language, @RequestParam String category);
}
