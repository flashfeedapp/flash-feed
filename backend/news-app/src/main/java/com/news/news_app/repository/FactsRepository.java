package com.news.news_app.repository;

import com.news.news_app.entity.Facts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactsRepository extends JpaRepository<Facts, Long> {
    List<Facts> findAll();
}
