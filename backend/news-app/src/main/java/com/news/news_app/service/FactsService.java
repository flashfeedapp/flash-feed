package com.news.news_app.service;

import com.news.news_app.entity.Facts;
import com.news.news_app.repository.FactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FactsService {

    @Autowired
    private FactsRepository factsRepository;

    public List<Facts> getFacts(){
        List<Facts> facts = factsRepository.findAll();
        return facts;
    }
}
