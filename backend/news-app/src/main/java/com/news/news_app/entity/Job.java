package com.news.news_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String organization;

    @Column(columnDefinition = "TEXT")
    private String qualification;

    @Column(columnDefinition = "TEXT")
    private String location;

    private LocalDate lastDate;

    @Column(columnDefinition = "TEXT")
    private String jobType;

    @Column(columnDefinition = "TEXT")
    private String applyLink;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private String language;

    @Column(columnDefinition = "TEXT")
    private String source;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private LocalDateTime publishedAt;

    private LocalDateTime createdAt;
}
