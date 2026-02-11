package com.news.news_app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DailyNewsCacheDto {

    private Long id;

    private String title;

    private String link;

    private String summary;

    private String imageUrl;

    private String source;

    private String category;

    private String language;

    private String state;

    private String country;

    @JsonProperty("time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime publishedAt;

    private LocalDateTime createdAt;
}
