package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.TodoDao;
import com.example.flownary.entity.Todo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {
	
	private final TodoDao tDao;

	@Override
	public Todo getTodo(int tid) {
		return tDao.getTodo(tid);
	}

	@Override
	public List<Todo> getTodoList(int uid) {
		return tDao.getTodoList(uid);
	}

	@Override
	public int getTodoHighest(int uid) {
		return tDao.getTodoHighest(uid);
	}

	@Override
	public void insertTodo(Todo todo) {
		tDao.insertTodo(todo);
	}

	@Override
	public void updateTodo(String contents, int tid) {
		tDao.updateTodo(contents, tid);
	}

	@Override
	public void updateTodoPri(int pri, int tid) {
		tDao.updateTodoPri(pri, tid);
	}

	@Override
	public void deleteTodo(int tid) {
		tDao.deleteTodo(tid);
	}

}
