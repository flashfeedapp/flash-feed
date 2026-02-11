package com.news.news_app.controller;

import com.news.news_app.entity.Users;
import com.news.news_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{deviceId}")
    public Users getUserDetails(@PathVariable String deviceId) {
        return userService.getUserDetails(deviceId);
    }

    @PutMapping("/{deviceId}")
    public Users updateUserDetails(@PathVariable String deviceId, @RequestParam String language, @RequestParam String country, @RequestParam String state) throws Exception {
        return userService.updateUserDetails(deviceId, language, country, state);
    }
}
