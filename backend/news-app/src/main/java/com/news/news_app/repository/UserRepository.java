package com.news.news_app.repository;

import com.news.news_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByDeviceId(String deviceId);
}
