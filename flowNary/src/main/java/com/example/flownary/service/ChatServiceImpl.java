package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.ChatDao;
import com.example.flownary.entity.Chat;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {
	
	private final ChatDao cDao;

	@Override
	public Chat getChat(int cid) {
		return cDao.getChat(cid);
	}

	@Override
	public List<Chat> getChatList(int uid) {
		return cDao.getChatList(uid);
	}

	@Override
	public List<Chat> getChatListImportant(int uid) {
		return cDao.getChatListImportant(uid);
	}

	@Override
	public void insertChat(Chat chat) {
		cDao.insertChat(chat);
	}

	@Override
	public void updateChat(int status, int cid) {
		cDao.updateChat(status, cid);
	}

	@Override
	public void deleteChat(int cid) {
		cDao.deleteChat(cid);
	}

}
