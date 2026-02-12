package com.news.news_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
@RequestMapping("/test")
public class DbTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/db")
    public String testDb() throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            return "Connected to DB: " + conn.getMetaData().getURL();
        }
    }
}
