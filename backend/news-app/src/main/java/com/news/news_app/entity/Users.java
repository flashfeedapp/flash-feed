package com.news.news_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String role;

    @Column(columnDefinition = "TEXT")
    private String emailId;

    @Column(columnDefinition = "TEXT")
    private String deviceId;

    @Column(columnDefinition = "TEXT")
    private String state;

    @Column(columnDefinition = "TEXT")
    private String country;

    @Column(columnDefinition = "TEXT")
    private String language;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
