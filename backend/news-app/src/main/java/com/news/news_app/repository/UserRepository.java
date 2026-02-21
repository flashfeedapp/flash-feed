package com.news.news_app.repository;

import com.news.news_app.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByDeviceId(String deviceId);
}
