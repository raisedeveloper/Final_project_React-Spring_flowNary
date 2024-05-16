package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Chat;

public interface ChatService {

	Chat getChat(int cid);
	
	Chat getChatUid(int uid1, int uid2);
	
	List<Chat> getChatList(int uid, int count);
	
	List<Chat> getChatListImportant(int uid, int count);
	
	void insertChat(Chat chat);
	
	void updateChat(int status, int cid);
	
	void deleteChat(int cid);
}
