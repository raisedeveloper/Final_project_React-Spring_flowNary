package com.example.flownary.service;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.ChatUserDao;
import com.example.flownary.entity.ChatUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatUserServiceImpl implements ChatUserService {
	
	private final ChatUserDao cuDao;

	@Override
	public ChatUser getChatUser(int cid, int uid) {
		return cuDao.getChatUser(cid, uid);
	}

	@Override
	public void insertChatUser(int cid, int uid) {
		cuDao.insertChatUser(cid, uid);
	}

	@Override
	public void updateChatUser(int status, int cid, int uid) {
		cuDao.updateChatUser(status, cid, uid);
	}

}
