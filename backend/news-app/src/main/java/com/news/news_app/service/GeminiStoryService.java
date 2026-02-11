package com.news.news_app.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiStoryService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    private String URL =
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=" + apiKey;

    public String generateStory(String prompt) {

        // ---- Request Body ----
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(body, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(URL, entity, Map.class);

        // ---- Extract text safely ----
        try {
            Map candidate = (Map) ((List) response.getBody().get("candidates")).get(0);
            Map content = (Map) candidate.get("content");
            Map part = (Map) ((List) content.get("parts")).get(0);
            return part.get("text").toString();
        } catch (Exception e) {
            return "Story generation failed";
        }
    }
}
