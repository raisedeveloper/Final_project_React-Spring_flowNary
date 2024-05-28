package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.FamilyUserDao;
import com.example.flownary.entity.FamilyUser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FamilyUserServiceImpl implements FamilyUserService {

	private final FamilyUserDao fuDao;

	@Override
	public FamilyUser getFamilyUser(int faid, int uid) {
		return fuDao.getFamilyUser(faid, uid);
	}

	@Override
	public List<FamilyUser> getFamilyUserList(int faid) {
		return fuDao.getFamilyUserList(faid);
	}

	@Override
	public List<FamilyUser> getFamilyUserListActive(int faid) {
		return fuDao.getFamilyUserListActive(faid);
	}

	@Override
	public void insertFamilyUser(int faid, int uid, String message) {
		fuDao.insertFamilyUser(faid, uid, message);
	}

	@Override
	public void updateFamilyUserStatus(int status, int faid, int uid) {
		fuDao.updateFamilyUserStatus(status, faid, uid);
	}

	@Override
	public void updateFamilyUserMessage(String message, int faid, int uid) {
		fuDao.updateFamilyUserMessage(message, faid, uid);
	}
}
