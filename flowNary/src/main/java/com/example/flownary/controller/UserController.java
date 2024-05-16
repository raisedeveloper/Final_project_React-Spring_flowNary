package com.example.flownary.controller;

import java.util.HashMap;
import java.util.regex.Pattern;

import org.json.simple.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.dto.User.RegisterUserDto;
import com.example.flownary.dto.User.UpdateUserDtoPwd;
import com.example.flownary.entity.Setting;
import com.example.flownary.entity.User;
import com.example.flownary.service.SettingService;
import com.example.flownary.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired private UserService userSvc;
	@Autowired private SettingService setSvc;
	
	// 회원가입
	@PostMapping("/register")
	public int userRegister(@RequestBody RegisterUserDto dto) {
		// 암호화 비밀번호 생성
		String hashedPwd = "";
		String hashuid = "";
		
		if (!dto.getPwd().equals("nn"))
			hashedPwd = BCrypt.hashpw(dto.getPwd(), BCrypt.gensalt());
		
		if (!dto.getHashuid().equals("nonGoogle"))
		{
			hashuid = dto.getHashuid();
		}
		
		User user = new User();
		user.setHashUid(hashuid);
		user.setEmail(dto.getEmail());
		user.setPwd(hashedPwd);
		user.setProvider(dto.getProvider());
		userSvc.insertUser(user);
		
		user = userSvc.getUserEmail(dto.getEmail());
		
		// 유저 생성했으므로 1:1로 해당 유저의 Setting에 대한 정보도 생성 후 저장
		Setting set = new Setting();
		
		set.setUid(user.getUid());
		set.setTheme("default");
		
		setSvc.insertSetting(set);
		
		return 0;
	}
	
	// 회원정보 수정 (개선판)
	@PostMapping(value = "/update")
	public int userUpdate2(HttpServletRequest request, @RequestBody User dto)
	{
		System.out.println(dto);
		User user = new User();
		user.setUid(dto.getUid());
		user.setUname(dto.getUname());
		user.setNickname(dto.getNickname());
		user.setProfile(dto.getProfile());
		user.setStatusMessage(dto.getStatusMessage());
		user.setSnsDomain(dto.getSnsDomain());
		user.setTel(dto.getTel());
		
		userSvc.updateUser(user);
		return 0;
	}
	
	@PostMapping("/updatepwd")
	public int userUpdate(@RequestBody UpdateUserDtoPwd dto)
	{
		String pattern = "^(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{6,16}$";
		String pwd1 = dto.getPwd1();
		String pwd2 = dto.getPwd2();
		
		// 비밀번호 불일치
		if (!pwd1.equals(pwd2))
		{
			return 1;
		}
		
		// 비밀번호 길이 부족
		if (pwd1.length() < 6)
		{
			return 2;
		}
		
		// 숫자와 특수문자를 포함하지 않을 경우
		if (!Pattern.matches(pattern, pwd1))
		{
			return 3;
		}
		
		String hashedPwd = BCrypt.hashpw(pwd1, BCrypt.gensalt());
		User user = new User();
		user.setPwd(hashedPwd);
		user.setUid(dto.getUid());
		
		userSvc.updateUserPwd(user);
		
		// 성공
		return 0;
	}
	
	@GetMapping("/getUser")
	public JSONObject getUser(@RequestParam int uid)
	{
		User user = userSvc.getUser(uid);
		
		if (user == null)
			return null;
		
		HashMap<String, Object> hMap = new HashMap<String, Object>();
		hMap.put("id", uid);
		hMap.put("email", user.getEmail());
		hMap.put("profile", user.getProfile());
		hMap.put("uname", user.getUname());
		hMap.put("nickname", user.getNickname());
		hMap.put("statusMessage", user.getStatusMessage());
		hMap.put("snsDomain", user.getSnsDomain());
		hMap.put("status", user.getStatus());
		hMap.put("regDate", user.getRegDate());
		hMap.put("gender", user.getGender());
		hMap.put("provider", user.getProvider());
		hMap.put("birth", user.getBirth());
		hMap.put("tel", user.getTel());
		hMap.put("hashUid", user.getHashUid());
		
		JSONObject userOut = new JSONObject(hMap);
		
		return userOut;
	}
	
	@GetMapping("/getUserByEmail")
	public JSONObject getUserEmail(@RequestParam String email)
	{
		User user = userSvc.getUserEmail(email);
		
		if (user == null)
			return null;
		
		HashMap<String, Object> hMap = new HashMap<String, Object>();
		hMap.put("id", user.getUid());
		hMap.put("email", user.getEmail());
		hMap.put("profile", user.getProfile());
		hMap.put("uname", user.getUname());
		hMap.put("nickname", user.getNickname());
		hMap.put("statusMessage", user.getStatusMessage());
		hMap.put("snsDomain", user.getSnsDomain());
		hMap.put("status", user.getStatus());
		hMap.put("regDate", user.getRegDate());
		hMap.put("gender", user.getGender());
		hMap.put("provider", user.getProvider());
		hMap.put("birth", user.getBirth());
		hMap.put("tel", user.getTel());
		hMap.put("hashUid", user.getHashUid());
		
		JSONObject userOut = new JSONObject(hMap);
		
		return userOut;
	}
}
