package com.news.news_app.repository;

import com.news.news_app.entity.DailyNewsCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyNewsCacheRepository extends JpaRepository<DailyNewsCache, Long> {

    List<DailyNewsCache> findByCategoryIgnoreCaseAndLanguageIgnoreCaseAndStateIgnoreCaseAndCountryIgnoreCaseOrderByPublishedAtDesc(String category, String language, String state, String country);

    List<DailyNewsCache> findByCategoryIgnoreCaseAndLanguageIgnoreCaseOrderByPublishedAtDesc(String category, String language);

    List<DailyNewsCache> findByCategory(String category);

    void deleteByCategory(String category);
}
