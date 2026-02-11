package com.news.news_app.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LlamaStoryService {

    private final RestTemplate restTemplate = new RestTemplate();

    public List<String> generateStory(String language) {

        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama3");
        body.put(
                "prompt",
                "Write 10 short interesting bedtime, Moral, Inspiring stories in " + language + ".\n" +
                        "Separate each story using this exact marker: <<<STORY>>>.\n" +
                        "Do NOT use this marker inside the stories."
        );
        body.put("stream", false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        Map response =
                restTemplate.postForObject(url, request, Map.class);

        String fullText = response.get("response").toString();

        return Arrays.stream(fullText.split("<<<STORY>>>"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}