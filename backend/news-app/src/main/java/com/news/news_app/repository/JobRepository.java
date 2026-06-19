package com.news.news_app.repository;

import com.news.news_app.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("""
    SELECT j
    FROM Job j
    WHERE
        (j.jobType IN ('Government', 'Private'))
        OR
        (j.jobType = 'NEWS' AND j.language = :language)
    ORDER BY j.publishedAt DESC
    """)
    List<Job> findJobsAndNews(@Param("language") String language);
}
