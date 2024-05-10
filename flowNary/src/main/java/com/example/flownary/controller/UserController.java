package com.example.flownary.controller;

import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

import org.json.simple.JSONArray;
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

import com.example.flownary.entity.Setting;
import com.example.flownary.entity.User;
import com.example.flownary.service.SettingService;
import com.example.flownary.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userSvc;
	@Autowired
	private SettingService setSvc;

	// 회원가입
	@GetMapping("/register")
	public void userRegister(@RequestParam String hashuid, @RequestParam int provider, @RequestParam String email,
			@RequestParam String pwd) {
		// 암호화 비밀번호 생성
		String hashedPwd = "";

		if (!pwd.equals("nn"))
			hashedPwd = BCrypt.hashpw(pwd, BCrypt.gensalt());

		if (hashuid.equals("nonGoogle")) {
			hashuid = "";
		}

		User user = new User();
		user.setHashUid(hashuid);
		user.setEmail(email);
		user.setPwd(hashedPwd);
		user.setProvider(provider);
		userSvc.insertUser(user);

		user = userSvc.getUserEmail(email);
//
//		// 유저 생성했으므로 1:1로 해당 유저의 Setting에 대한 정보도 생성 후 저장
//		Setting set = new Setting();
//
//		set.setUid(user.getUid());
//		set.setTheme("default");
//
//		setSvc.insertSetting(set);
	}

	// 회원정보 수정
//	@PostMapping("/update")
//	public int userUpdate(@RequestParam(value="", required =false) String uname
//			, @RequestParam(value="", required =false) String nickname
//			, @RequestParam(value="", required =false) String profile
//			, @RequestParam(value="", required =false) String statusMessage
//			, @RequestParam(value="", required =false) String snsDomain
//			, @RequestParam("uid") int uid
//			, @RequestParam(value="", required =false) String birth
//			, @RequestParam(value="", required =false) String tel)
//	{
//		System.out.println(uid);
//		User user = new User();
//		user.setUid(uid);
//		user.setUname(uname);
//		user.setNickname(nickname);
//		user.setProfile(profile);
//		user.setStatusMessage(statusMessage);
//		user.setSnsDomain(snsDomain);
//		user.setTel(tel);
//		
//		userSvc.updateUser(user);
//		
//		return 0;
//	}

	// 회원정보 수정 (개선판)
	@PostMapping(value = "/update")
	public int userUpdate2(HttpServletRequest request, @RequestBody User dto) {
		System.out.println(dto);
		User user = new User();
		user.setUid(dto.getUid());
		user.setUname(dto.getUname());
		user.setNickname(dto.getNickname());
		user.setProfile(dto.getProfile());
		user.setStatusMessage(dto.getStatusMessage());
		user.setBirth(dto.getBirth());
		user.setSnsDomain(dto.getSnsDomain());
		user.setGender(dto.getGender());
		user.setTel(dto.getTel());
		
		System.out.println(user);
		userSvc.updateUser(user);
		return 0;
	}

	@GetMapping("/getUser")
	public JSONObject getUser(@RequestParam int uid) {
		User user = userSvc.getUser(uid);
		if (user == null) {
			JSONObject qwe = new JSONObject();
			System.out.println(qwe);
			return qwe;
		} else {
			HashMap<String, Object> hMap = new HashMap<String, Object>();
			hMap.put("id", uid);
			hMap.put("pwd", user.getPwd());
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

	@GetMapping("/getUserByEmail")
	public JSONObject getUserEmail(@RequestParam String email) {
		User user = userSvc.getUserEmail(email);
		if (user == null) {
			JSONObject qwe = new JSONObject();
			System.out.println(qwe);
			return qwe;
		} else {
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
			hMap.put("provider", user.getProvider());

			JSONObject userOut = new JSONObject(hMap);

			return userOut;
		}
	}

	@GetMapping("/nickname")
	public String nickname(@RequestParam String email, String nickname) {
		List<User> userList = userSvc.getOthersUserList(email);
		JSONObject jObj = new JSONObject();
		JSONArray jArr = new JSONArray();

		for (int i = 0; i < userList.size(); i++) {
			JSONObject jObject = new JSONObject();
			User user = userList.get(i);

			jObject.put("nickname", user.getNickname());
			jArr.add(jObject);
		}
		jObj.put("item", jArr);
		return jArr.toString();
	}

	@GetMapping("/tel")
	public String tel(@RequestParam String email, String tel) {
		List<User> userList = userSvc.getOthersUserList(email);
		JSONObject jObj = new JSONObject();
		JSONArray jArr = new JSONArray();

		for (int i = 0; i < userList.size(); i++) {
			JSONObject jObject = new JSONObject();
			User user = userList.get(i);

			jObject.put("tel", user.getTel());
			jArr.add(jObject);
		}
		jObj.put("item", jArr);
		return jArr.toString();
	}
}