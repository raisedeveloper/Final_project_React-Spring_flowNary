package com.example.flownary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping(value = {"/{path:[^\\.]*}", "/url/*"})
    public String redirect() {
        // 모든 경로를 index.html로 리디렉션
        return "forward:/index.html";
    }
}