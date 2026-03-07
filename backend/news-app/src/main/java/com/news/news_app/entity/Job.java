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

    private String title;

    private String organization;

    private String qualification;

    private String location;

    private LocalDate lastDate;

    private String jobType;

    private String applyLink;

    private String imageUrl;

    private String language;

    private String source;

    private String summary;

    private LocalDateTime publishedAt;

    private LocalDateTime createdAt;
}
