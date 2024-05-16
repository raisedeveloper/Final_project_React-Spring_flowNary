package com.example.flownary.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.example.flownary.dao.UserDao;
import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
	
	private final UserDao uDao;

	@Override
	public User getUser(int uid) {
		return uDao.getUser(uid);
	}

	@Override
	public User getUserEmail(String email) {
		return uDao.getUserEmail(email);
	}
	
	@Override
	public GetUserNickEmailDto getUserNicknameEmail(int uid) {
		return uDao.getUserNicknameEmail(uid);
	}
	
	@Override
	public void insertUser(User user) {
		uDao.insertUser(user);
	}

	@Override
	public void updateUser(User user) {
		uDao.updateUser(user);
	}

	@Override
	public void deleteUser(int uid) {
		uDao.deleteUser(uid);
	}

	@Override
	public int login(String email, String pwd) {
		User user = uDao.getUserEmail(email);
		
		if (user == null)
			return USER_NOT_EXIST;
		
		if (!BCrypt.checkpw(pwd, user.getPwd()))
			return PASSWORD_WRONG;
		
		return CORRECT_LOGIN;
	}

	@Override
	public void updateUserPwd(User user) {
		uDao.updateUserPwd(user);
	}
}
