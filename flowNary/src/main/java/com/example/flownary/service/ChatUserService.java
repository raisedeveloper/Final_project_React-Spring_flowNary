package com.example.flownary.service;

import com.example.flownary.entity.ChatUser;

public interface ChatUserService {

	ChatUser getChatUser(int cid, int uid);
	
	void insertChatUser(int cid, int uid);
	
	void updateChatUser(int status, int cid, int uid);
}
