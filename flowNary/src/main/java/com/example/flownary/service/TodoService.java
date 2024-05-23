package com.example.flownary.service;

import java.util.List;
import com.example.flownary.entity.Todo;

public interface TodoService {
	
	Todo getTodo(int tid);
	
	List<Todo> getTodoList(int uid);
	
	int getTodoHighest(int uid);
	
	void insertTodo(Todo todo);
	
	void updateTodo(String contents, int tid);
	
	void updateTodoPri(int pri, int tid);
	
	void deleteTodo(int tid);
}
