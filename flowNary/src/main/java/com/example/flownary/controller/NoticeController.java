package com.example.flownary.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.config.WebSocketEventListener;
import com.example.flownary.dto.Notice.deleteNoticedto;
import com.example.flownary.dto.Notice.insertNoticedto;
import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.Family;
import com.example.flownary.entity.Notice;
import com.example.flownary.service.FamilyService;
import com.example.flownary.service.NoticeService;
import com.example.flownary.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class NoticeController {

	private final NoticeService nSvc;
	private final UserService uSvc;
	private final FamilyService fSvc;
	private final WebSocketEventListener wel;
	
	private final SimpMessagingTemplate noticeTemplate;
	
	public void insertNotice(int suid, int type, int oid, int uid) {
		Notice notice = new Notice();
		notice.setOid(oid);
		notice.setUid(uid);
		notice.setSuid(suid);
		notice.setType(type);
		
		GetUserNickEmailDto user = uSvc.getUserNicknameEmail(suid);
		String nContents = "";
		String nickname = "";
		
		if (user.getNickname() == null || user.getNickname() == "")
		{
			nickname = user.getEmail().split("@")[0];
		}
		else
		{
			nickname = user.getNickname();
		}
		
		switch(type) {
		case 1:
			// 팔로잉한 사람이 게시물 작성 시 알람 설정
			nContents = nickname + "님이 새 글을 작성했습니다.";
			notice.setnContents(nContents);
			break;
		case 2:
			// 자신의 게시물에 댓글이 달릴 때 알람 설정
			nContents = nickname + "님이 제 글에 댓글을 달았어요.";
			notice.setnContents(nContents);
			break;
		case 3:
			// 타인이 자신을 팔로잉 했을 때 알람 설정
			nContents = nickname + "님이 저를 팔로잉했습니다.";
			notice.setnContents(nContents);
			break;
		case 4:
			// 누군가가 자신에게 메세지를 보냈을 때 알람 설정
			nContents = nickname + " 닉네임이 메세지를 보냈습니다.";
			notice.setnContents(nContents);
			break;
		default:
			System.out.println("notice type error!");
			break;
		}
		
		notice.setRegTime(LocalDateTime.now());
		nSvc.insertNotice(notice);
		
		publishNotice(notice);
	}
	
	public void insertNoticeList(List<Integer> uidlist, int type, int oid, int suid) {
		Notice notice = new Notice();
		notice.setOid(oid);
		notice.setType(type);
		notice.setSuid(suid);
		
		GetUserNickEmailDto user = uSvc.getUserNicknameEmail(suid);
		String nContents = "";
		String nickname = "";
		
		if (user.getNickname() == null || user.getNickname() == "")
		{
			nickname = user.getEmail().split("@")[0];
		}
		else
		{
			nickname = user.getNickname();
		}
		
		switch(type) {
		case 1:
			// 팔로잉한 사람이 게시물 작성 시 알람 설정
			nContents = nickname + "님이 새 글을 작성했습니다.";
			notice.setnContents(nContents);
			break;
		case 2:
			// 자신의 게시물에 댓글이 달릴 때 알람 설정
			nContents = nickname + "님이 제 글에 댓글을 달았어요.";
			notice.setnContents(nContents);
			break;
		case 3:
			// 타인이 자신을 팔로잉 했을 때 알람 설정
			nContents = nickname + "님이 저를 팔로잉했습니다.";
			notice.setnContents(nContents);
			break;
		case 4:
			// 누군가가 자신에게 메세지를 보냈을 때 알람 설정
			nContents = nickname + " 닉네임이 메세지를 보냈습니다.";
			notice.setnContents(nContents);
			break;
		default:
			System.out.println("notice type error!");
			break;
		}
		
		notice.setRegTime(LocalDateTime.now());
		
		List<Notice> list = new ArrayList<>();
		for (int uid: uidlist) {
			if (type == 4 && wel.isUserOnPage(uid, "chatroom" + oid)) {
				continue;
			}
			notice.setUid(uid);
			list.add(notice);
			publishNotice(notice);
		}
		
		nSvc.insertNoticeList(list);
	}
	
	
    @MessageMapping("/notice") // "/app/notice"
    public void publishNotice(Notice notice) {
    	
        log.info("publishNotice : {}", notice);

        if (!wel.isUserOnPage(notice.getUid(), "notice")) {
        	if (notice.getType() != 4) {
        		noticeTemplate.convertAndSend("/user/notice/" + notice.getUid(), notice);        	        		
        	}
        	else {
        		if (!wel.isUserOnPage(notice.getUid(), "chat") && !wel.isUserOnPage(notice.getUid(), "chatroom")) {
        			noticeTemplate.convertAndSend("/user/chatnotice/" + notice.getUid(), notice);        			
        		}
        	}
        }
        
    	if (wel.isUserOnPage(notice.getUid(), "notice")) {
    		switch(notice.getType()) {
    		case 1:
    			noticeTemplate.convertAndSend("/user/notice1/" + notice.getUid(), notice);
    			break;
    		case 2:
    			noticeTemplate.convertAndSend("/user/notice2/" + notice.getUid(), notice);
    			break;
    		case 3:
    			noticeTemplate.convertAndSend("/user/notice3/" + notice.getUid(), notice);
    			break;
    		case 4:
    			noticeTemplate.convertAndSend("/user/notice4/" + notice.getUid(), notice);
    			break;
    		}
    	}
    }
    
    @MessageMapping("/noticeAll")
    public void publishNoticeAll(int uid) {
    	
        log.info("publishNotice_uid : {}", uid);

        noticeTemplate.convertAndSend("/user/noticeAll/" + uid, uid);
    }
    
    @MessageMapping("/chatnoticeAll")
    public void publishChatNoticeAll(int uid) {
    	
    	log.info("publishChatNotice_uid : {}", uid);
    	
    	noticeTemplate.convertAndSend("/user/chatnoticeAll/" + uid, uid);
    }
    
    @MessageMapping("/UpdateNoticeCount")
    public void publishNoticeCount(int uid, int count, int type) {
    	log.info("publishNoticeCount_count : {}", count);
    	
    	if (type == 0) {    		
    		noticeTemplate.convertAndSend("/user/noticecount/" + uid, count);
    	}
    	else {
    		noticeTemplate.convertAndSend("/user/noticechatcount/" + uid, count);
    	}
    	
    }
    
    public void publishSwalNotice(Notice notice) {
    	log.info("publishNotice_Swal : {}", notice);
    	
    	if (!wel.isUserOnPage(notice.getUid(), "notice")) {
    		noticeTemplate.convertAndSend("/user/swalnotice/" + notice.getUid(), notice);
    	}
    	
    	if (wel.isUserOnPage(notice.getUid(), "notice")) {
    		switch(notice.getType()) {
    		case 5:
    			noticeTemplate.convertAndSend("/user/notice5/" + notice.getUid(), notice);
    			break;
    		}
    	}
    }

	@GetMapping("/list")
	public JSONArray getNoticeUid(@RequestParam int uid,
			@RequestParam(defaultValue="0", required=false) int type) {
		
		List<Notice> list = new ArrayList<>();
		
		switch(type) {
		case 0:
			list = nSvc.getNoticeListAll(uid);
			break;
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			list = nSvc.getNoticeList(uid, type);
			break;
		default:
			System.out.println("notice list type error!");
			break;
		}
		
		JSONArray jArr = new JSONArray();
		
		for (Notice notice: list) {
			HashMap<String, Object> hMap = new HashMap<>();
			GetUserNickEmailDto user = uSvc.getUserNicknameEmail(notice.getSuid());
			
			hMap.put("nid", notice.getNid());
			hMap.put("uid", notice.getUid());
			hMap.put("type", notice.getType());
			hMap.put("oid", notice.getOid());
			hMap.put("nContents", notice.getnContents());
			hMap.put("suid", notice.getSuid());
			hMap.put("regTime", notice.getRegTime());
			hMap.put("profile", user.getProfile());
			
			JSONObject jObj = new JSONObject(hMap);
			jArr.add(jObj);
		}
		
		return jArr;
	}
	
	@GetMapping("/count")
	public int getNoticeCount(@RequestParam int uid) {
		if (uid == -1)
			return 0;
		
		return nSvc.getNoticeCount(uid) - nSvc.getNoticeCountType(uid, 4);
	}
	
	@GetMapping("/chatcount")
	public int getNoticeCountChat(@RequestParam int uid) {
		if (uid == -1)
			return 0;
		
		return nSvc.getNoticeCountType(uid, 4);
	}
	
	@GetMapping("/get")
	public JSONObject getNotice(@RequestParam int uid, @RequestParam int suid,
			@RequestParam int type, @RequestParam int oid)	{
		
		Notice notice = nSvc.getNoticeUid(uid, suid, type, oid);
		HashMap<String, Object> hMap = new HashMap<>();
		GetUserNickEmailDto user = uSvc.getUserNicknameEmail(notice.getSuid());
		
		hMap.put("nid", notice.getNid());
		hMap.put("uid", notice.getUid());
		hMap.put("type", notice.getType());
		hMap.put("oid", notice.getOid());
		hMap.put("nContents", notice.getnContents());
		hMap.put("suid", notice.getSuid());
		hMap.put("regTime", notice.getRegTime());
		hMap.put("profile", user.getProfile());
		
		JSONObject jObj = new JSONObject(hMap);
		
		return jObj;
	}
	
	@GetMapping("/getcheck")
	public int getNoticeCheck(@RequestParam int uid, @RequestParam int suid,
			@RequestParam int type, @RequestParam int oid)	{
		
		Notice notice = nSvc.getNoticeUid(uid, suid, type, oid);
		if (notice == null)
			return 0;
		
		return 1;
	}
	
	@PostMapping("/insert")
	public int insertNoticeDirect(@RequestBody insertNoticedto notice) {
		
		Notice n = new Notice();
//		String nContents;
		GetUserNickEmailDto user = new GetUserNickEmailDto();
		n.setOid(notice.getOid());
		n.setUid(notice.getUid());
		n.setSuid(notice.getSuid());
		n.setType(notice.getType());
		
		switch(notice.getType()) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			user = uSvc.getUserNicknameEmail(notice.getSuid());
			Family family = fSvc.getFamily(notice.getOid());
			n.setnContents(user.getNickname() + "님이 " + family.getName() + " 패밀리에 초대했습니다.");
			int nid = nSvc.insertNotice(n);
			n = nSvc.getNotice(nid);
			if (wel.isUserOnConnected(notice.getUid())) {
				publishSwalNotice(n);
			}
			break;
		default:
			break;
		}
		return 0;
	}
	
	@PostMapping("/remove")
	public int removeNotice(@RequestBody JSONObject nid) {
		int inid = Integer.parseInt(nid.get("nid").toString());
		Notice notice = nSvc.getNotice(inid);
		
		if (notice == null)
		{
			return -1;
		}
		else
		{
			nSvc.removeNotice(inid);
		}
		
		return 0;
	}
	
	@PostMapping("/removeAll")
	public int removeNoticeAll(@RequestBody JSONObject uid) {
		int iuid = Integer.parseInt(uid.get("uid").toString());
		int type = Integer.parseInt(uid.get("type").toString());
		if (iuid == -1)
			return -1;
		
		if (type == 0) {
			nSvc.disableNoticeAll(iuid);
		}
		else if (type == 1) {
			nSvc.removeNoticeAll(iuid);			
		}
		
		if (nSvc.getNoticeCount(iuid) != 0)
		{
			return -1;
		}
		else
		{
			publishNoticeAll(iuid);
		}
		
		return 0;
	}
	
	@PostMapping("/removeAllChat")
	public int removeNoticeAllChat(@RequestBody JSONObject uid) {
		int iuid = Integer.parseInt(uid.get("uid").toString());
		nSvc.disableNoticeAllChat(iuid);
		
		publishChatNoticeAll(iuid);
		
		return 0;
	}
	
	@PostMapping("/removeSpecific")
	public int removeNoticeSpecific(@RequestBody deleteNoticedto dto) {
		if (dto.getType() == 2) {
			nSvc.removeNoticeSpecific(dto.getUid(), dto.getType(), dto.getOid());
			nSvc.removeNoticeSpecific(dto.getUid(), 1, dto.getOid());			
		}
		else if (dto.getType() == 4) {
//			List<Integer> dlist = dSvc.getDidList(dto.getOid());
//			for (Integer k : dlist) {
//				nSvc.removeNoticeSpecific(dto.getUid(), dto.getType(), k);
//			}
			nSvc.removeNoticeSpecific(dto.getUid(), dto.getType(), dto.getOid());
		}
		else {			
			nSvc.removeNoticeSpecific(dto.getUid(), dto.getType(), dto.getOid());
		}
		
		int count = nSvc.getNoticeCount(dto.getUid()) - nSvc.getNoticeCountType(dto.getUid(), 4);
		int ccount = nSvc.getNoticeCountType(dto.getUid(), 4);
		if (dto.getType() != 4) {
			publishNoticeCount(dto.getUid(), count, 0);
		}
		else {
			publishNoticeCount(dto.getUid(), ccount, 1);
		}
		
		return 0;
	}
}
