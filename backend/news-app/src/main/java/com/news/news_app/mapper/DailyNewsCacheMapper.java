package com.news.news_app.mapper;

import com.news.news_app.dto.DailyNewsCacheDto;
import com.news.news_app.entity.DailyNewsCache;

import java.time.format.DateTimeFormatter;

public class DailyNewsCacheMapper {

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    // Entity -> DTO
    public static DailyNewsCacheDto toDto(DailyNewsCache entity) {
        if (entity == null) return null;

        DailyNewsCacheDto dto = new DailyNewsCacheDto();
        dto.setTitle(entity.getTitle());
        dto.setSummary(entity.getSummary());
        dto.setImageUrl(entity.getImageUrl());
        dto.setLink(entity.getLink());
        dto.setSource(entity.getSource());
        dto.setCategory(entity.getCategory());
        dto.setLanguage(entity.getLanguage());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPublishedAt(entity.getPublishedAt());
        dto.setCreatedAt(entity.getCreatedAt());

        return dto;
    }

    // DTO -> Entity (for manual add)
    public static DailyNewsCache toEntity(DailyNewsCacheDto dto) {
        if (dto == null) return null;

        DailyNewsCache entity = new DailyNewsCache();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setSummary(dto.getSummary());
        entity.setImageUrl(dto.getImageUrl());
        entity.setLink(dto.getLink());
        entity.setSource(dto.getSource());
        entity.setCategory(dto.getCategory());
        entity.setLanguage(dto.getLanguage());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPublishedAt(dto.getPublishedAt());
        entity.setCreatedAt(dto.getCreatedAt());

        return entity;
    }
}
