package com.news.news_app.repository;

import com.news.news_app.entity.Job;
import com.news.news_app.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findTop10ByLanguage(String language);
}
