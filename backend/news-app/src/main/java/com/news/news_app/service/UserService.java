package com.news.news_app.service;

import com.news.news_app.entity.Users;
import com.news.news_app.repository.UserRepository;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users getUserDetails(String deviceId) {
        return userRepository.findByDeviceId(deviceId);
    }

    public Users updateUserDetails(String deviceId, String language, String country, String state) throws Exception {
        Users userDetails = getUserDetails(deviceId);
        if(ObjectUtils.isEmpty(userDetails)) {
            throw new Exception("User with given deviceId does not exist");
        }
        if (StringUtils.isNotEmpty(language)) {
            userDetails.setLanguage(language);
        }
        if (StringUtils.isNotEmpty(country)) {
            userDetails.setCountry(country);
        }
        if (StringUtils.isNotEmpty(state)) {
            userDetails.setState(state);
        }
        return userRepository.save(userDetails);
    }
}
