package com.example.flownary.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.flownary.dto.DmList.insertDmList;
import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.DmList;
import com.example.flownary.service.DmListService;
import com.example.flownary.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/dmlist")
@SuppressWarnings("unchecked")
public class DmListController {
	
	private final DmListService dSvc;
	private final UserService uSvc;

    private static final Set<String> SESSION_IDS = new HashSet<>();
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat") // "/pub/chat"
    public void publishChat(insertDmList idmList) {
        log.info("publishChat : {}", idmList);
        
        DmList dmList = new DmList();
        dmList.setCid(idmList.getCid());
        dmList.setUid(idmList.getUid());
        dmList.setdContents(idmList.getdContents());
        dmList.setdFile(idmList.getdFile());
        dmList.setNickname(idmList.getNickname());
        dmList.setdTime(LocalDateTime.now());
        dmList.setProfile(idmList.getProfile());
        
        dSvc.insertDmList(dmList);
        
        messagingTemplate.convertAndSend("/sub/chat/" + dmList.getCid(), dmList);
    }

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        SESSION_IDS.add(sessionId);
        log.info("[connect] connections : {}", SESSION_IDS.size());
    }

    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        SESSION_IDS.remove(sessionId);
        log.info("[disconnect] connections : {}", SESSION_IDS.size());
    }
    
    @GetMapping("/list")
    public JSONArray getDmList(@RequestParam int cid,
    		@RequestParam(defaultValue="20", required=false) int count) {
    	List<DmList> list = dSvc.getDmListList(cid, count);
    	if (list.size() == 0)
    		return null;
    	
    	JSONArray jArr = new JSONArray();
    	
    	for (DmList dmList: list) {
    		HashMap<String, Object> hMap = new HashMap<String, Object>();
    		GetUserNickEmailDto user = uSvc.getUserNicknameEmail(dmList.getUid());
    		hMap.put("did", dmList.getDid());
    		hMap.put("uid", dmList.getUid());
    		hMap.put("cid", dmList.getCid());
    		hMap.put("dContents", dmList.getdContents());
    		hMap.put("dTime", dmList.getdTime());
    		hMap.put("dFile", dmList.getdFile());
    		hMap.put("nickname", dmList.getNickname());
    		hMap.put("profile", user.getProfile());
    		
    		JSONObject jObj = new JSONObject(hMap);
    		jArr.add(jObj);
    	}
    	
    	return jArr;
    }
    
    @GetMapping("/listUid")
    public JSONArray getDmListUid(@RequestParam int uid,
    		@RequestParam(defaultValue="20", required=false) int count) {
    	List<DmList> list = dSvc.getDmListListByUid(uid, count);
    	if (list.size() == 0)
    		return null;
    	
    	JSONArray jArr = new JSONArray();
    	
    	for (DmList dmList: list) {
    		HashMap<String, Object> hMap = new HashMap<String, Object>();
    		hMap.put("did", dmList.getDid());
    		hMap.put("uid", dmList.getUid());
    		hMap.put("cid", dmList.getCid());
    		hMap.put("dContents", dmList.getdContents());
    		hMap.put("dTime", dmList.getdTime());
    		hMap.put("dFile", dmList.getdFile());
    		hMap.put("nickname", dmList.getNickname());
    		
    		JSONObject jObj = new JSONObject(hMap);
    		jArr.add(jObj);
    	}
    	
    	return jArr;
    }
    
    @PostMapping("/delete")
    public int deleteDm(@RequestBody int did) {
    	dSvc.deleteDmList(did);
    	return 0;
    }
}
