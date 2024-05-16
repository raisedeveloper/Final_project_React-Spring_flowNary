package com.example.flownary.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.dto.Chat.InsertChatDto;
import com.example.flownary.dto.Chat.updateChatDto;
import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.Chat;
import com.example.flownary.entity.ChatUser;
import com.example.flownary.service.ChatService;
import com.example.flownary.service.ChatUserService;
import com.example.flownary.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
@SuppressWarnings("unchecked")
public class ChatController {
	private final ChatService cSvc;
	private final UserService uSvc;
	private final ChatUserService cuSvc;
    
    private HashMap<String, Object> makeChatData(Chat chat) {
    	
    	HashMap<String, Object> hMap = new HashMap<String, Object>();
    	
		String nickname1;
		String nickname2;
		
		hMap.put("cid", chat.getCid());
		hMap.put("regTime", chat.getRegTime());
		
		GetUserNickEmailDto user = uSvc.getUserNicknameEmail(chat.getUid1());
		hMap.put("uid1", chat.getUid1());
		hMap.put("profile1", user.getProfile());
		if (user.getNickname() != null && user.getNickname() != "")
		{
			nickname1 = user.getNickname();
			hMap.put("nickname1", user.getNickname());    			
		}
		else
		{
			nickname1 = user.getEmail().split("@")[0];
			hMap.put("nickname1", nickname1);
		}
		
		user = uSvc.getUserNicknameEmail(chat.getUid2());
		hMap.put("uid2", chat.getUid2());
		hMap.put("profile2", user.getProfile());
		if (user.getNickname() != null && user.getNickname() != "")
		{
			nickname2 = user.getNickname();
			hMap.put("nickname2", nickname2);    			
		}
		else
		{
			nickname2 = user.getEmail().split(",")[0];
			hMap.put("nickname2", nickname2);
		}
		
		hMap.put("title", nickname1 + "과 " + nickname2 + "의 채팅방");
		
		return hMap;
    }
    
    @GetMapping("/get")
    public JSONObject getChat(@RequestParam int cid,
    		@RequestParam(defaultValue="-1", required=false) int uid) {
    	Chat chat = cSvc.getChat(cid);
    	HashMap<String, Object> hMap = new HashMap<String, Object>();
    	
    	if (chat != null)
    	{
    		hMap = makeChatData(chat);
    		JSONObject jObj = new JSONObject(hMap);
    		return jObj;
    	}
    	
    	return null; 
    }
    
    @GetMapping("/list")
    public JSONArray getChatList(@RequestParam int uid, 
    		@RequestParam(defaultValue="1", required=false) int count,
    		@RequestParam(defaultValue="0", required=false) int status) {
    	
    	List<Chat> list = new ArrayList<>();
    	
    	switch (status) {
		case 0:			
			list = cSvc.getChatList(uid, count);
			break;
		case 1:
			list = cSvc.getChatListImportant(uid, count);
			break;
		default:
			System.out.println("getChatList status error!");
			return null;
		}
    	
    	JSONArray jArr = new JSONArray();
    	for (Chat chat: list) {
    		HashMap<String, Object> hMap = new HashMap<String, Object>();
    		
    		hMap = makeChatData(chat);
    		JSONObject jObj = new JSONObject(hMap);
    		jArr.add(jObj);
    	}
    	
    	return jArr;
    }
    
    @PostMapping("/insert")
    public int insertChat(@RequestBody InsertChatDto dto) {
    	Chat chat = new Chat();
    	
    	chat.setUid1(dto.getUid1());
    	chat.setUid2(dto.getUid2());
    	
    	cSvc.insertChat(chat);
    	
    	chat = cSvc.getChatUid(dto.getUid1(), dto.getUid2());

    	cuSvc.insertChatUser(chat.getCid(), chat.getUid1());
    	cuSvc.insertChatUser(chat.getCid(), chat.getUid2());
    	
    	return 0;
    }
    
    @PostMapping("/update")
    public int updateChat(@RequestBody updateChatDto dto) {
    	ChatUser chatUser = cuSvc.getChatUser(dto.getCid(), dto.getUid());
    	
    	if (chatUser.getStatus() == 0)
    		cuSvc.updateChatUser(1, dto.getCid(), dto.getUid());
    	else
    		cuSvc.updateChatUser(0, dto.getCid(), dto.getUid());
    	
    	return 0;
    }
    
    @PostMapping("/exit")
    public int exitChat(@RequestBody updateChatDto dto) {
    	cuSvc.updateChatUser(-1, dto.getCid(), dto.getUid());
    	
    	return 0;
    }
    
    @PostMapping("/delete")
    public int deleteChat(@RequestBody int cid) {
    	cSvc.deleteChat(cid);
    	
    	return 0;
    }
}