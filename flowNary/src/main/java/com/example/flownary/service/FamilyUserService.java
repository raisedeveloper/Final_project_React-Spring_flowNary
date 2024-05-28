package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.FamilyUser;

public interface FamilyUserService {

	FamilyUser getFamilyUser(int faid, int uid);
	
	List<FamilyUser> getFamilyUserList(int faid);
	
	List<FamilyUser> getFamilyUserListActive(int faid);
	
	void insertFamilyUser(int faid, int uid, String message);
	
	void updateFamilyUserStatus(int status, int faid, int uid);
	
	void updateFamilyUserMessage(String message, int faid, int uid);
}
