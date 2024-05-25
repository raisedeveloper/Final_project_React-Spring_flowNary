package com.example.flownary.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.dto.Todo.todoDto;
import com.example.flownary.entity.Todo;
import com.example.flownary.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class TodoController {
	private final TodoService tSvc;

	@GetMapping("/list")
	public JSONArray todoList(@RequestParam( defaultValue="-1", required=true) int uid) {
		
		List<Todo> list = tSvc.getTodoList(uid);
		
		JSONArray jArr = new JSONArray();
		for(Todo todo:list) {
			HashMap<String, Object> hMap = new HashMap<String, Object>();
			
 			hMap.put("tid", todo.getTid());
			hMap.put("uid", todo.getUid());
			hMap.put("contents", todo.getContents());
			hMap.put("pri", todo.getPri());

			JSONObject jTodo = new JSONObject(hMap);
			
			jArr.add(jTodo);
		}
		return jArr;
	}
	
	@PostMapping("/update")
	public void todoUpdate(@RequestBody todoDto dto) {
		tSvc.updateTodo(dto.getTid(), dto.getContents(), dto.getPri());
	}
	
	@PostMapping("/insert")
	public void todoinsert(@RequestBody todoDto dto) {
		tSvc.insertTodo(dto.getUid(), dto.getContents());
	}
	
	@PostMapping("/delete")
	public void tododelete(@RequestBody JSONObject tid) {
		System.out.println("tid" + Integer.parseInt(tid.get("tid").toString()));
		tSvc.deleteTodo(Integer.parseInt(tid.get("tid").toString()));
	}

}
