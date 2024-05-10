package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Chat;

public interface ChatService {

	Chat getChat(int cid);
	
	List<Chat> getChatList(int uid);
	
	List<Chat> getChatListImportant(int uid);
	
	void insertChat(Chat chat);
	
	void updateChat(int status, int cid);
	
	void deleteChat(int cid);
}
