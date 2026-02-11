package com.news.news_app.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "gNews",url = "https://gnews.io/api")
public interface GNewsClient {

    @GetMapping("/v4/top-headlines?apikey=66b6c48a1f1f1e5b017404edef03ab94")
    public Object getNationalNewsByGNews(@RequestParam String category, @RequestParam String lang, @RequestParam String q,@RequestParam int page, @RequestParam String country);
}
