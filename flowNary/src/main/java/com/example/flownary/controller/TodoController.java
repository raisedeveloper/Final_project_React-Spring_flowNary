package com.example.flownary.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.entity.Todo;
import com.example.flownary.service.TodoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class TodoController {
	private final TodoService tSvc;

	@GetMapping("/list")
	public JSONArray boardList(@RequestParam( defaultValue="-1", required=true) int uid) {
		
		List<Todo> list = tSvc.getTodoList(uid);
		
		JSONArray jArr = new JSONArray();
		for(Todo todo:list) {
			HashMap<String, Object> hMap = new HashMap<String, Object>();
			
 			hMap.put("tid", todo.getTid());
			hMap.put("uid", todo.getUid());
			hMap.put("contents", todo.getContents());
			hMap.put("pri", todo.getPri());

			JSONObject jTodo = new JSONObject(hMap);
			
			jArr.add(jTodo);
		}
		return jArr;
	}
	
//	@GetMapping("/mylist")
//	public JSONArray boardMyList(@RequestParam int uid) {
//
//		List<Board> list = bSvc.getMyBoardList(uid);
//		
//		JSONArray jArr = new JSONArray();
//		for (Board board : list) {
//			HashMap<String, Object> hMap = new HashMap<String, Object>();
//			int liked = lSvc.getLikeUidCount(uid, 1, board.getBid());
//			GetUserNickEmailDto user = uSvc.getUserNicknameEmail(board.getUid());
//
//			hMap.put("bid", board.getBid());
//			hMap.put("uid", board.getUid());
//			hMap.put("title", board.getTitle());
//			hMap.put("bContents", board.getbContents());
//			hMap.put("modTime", board.getModTime());
//			hMap.put("viewCount", board.getViewCount());
//			hMap.put("likeCount", board.getLikeCount());
//			hMap.put("replyCount", board.getReplyCount());
//			hMap.put("image", board.getImage());
//			if (board.getImage() == null || board.getImage() == "") {
//				hMap.put("imagecount", 0);
//			} else {
//				int c = board.getImage().length() - board.getImage().replace(",", "").length();
//				hMap.put("iamgecount", c + 1);
//			}
//			hMap.put("shareUrl", board.getShareUrl());
//			hMap.put("isDeleted", board.getIsDeleted());
//			hMap.put("hashTag", board.getHashTag());
//			hMap.put("nickname", board.getNickname());
//			hMap.put("liked", (liked == 1) ? true : false);
//			hMap.put("profile", user.getProfile());
//			JSONObject jBoard = new JSONObject(hMap);
//			jArr.add(jBoard);
//		}
//		return jArr;
//	}
//	
//	@PostMapping("/insert")
//	public int insertForm(@RequestBody InsertBoardDto dto) {
//		
//		String shareUrl = "";
//		boolean t = true;
//		
//		while (t)
//		{
//			shareUrl = RandomStringUtils.randomAlphanumeric(10);
//			
//			if (bSvc.getBoardShareUrl(shareUrl) == 0)
//			{
//				t = false;
//				break;
//			}
//		}
//		
//		Board board = new Board(dto.getUid(), dto.getTitle()
//				, dto.getbContents(), dto.getImage(), shareUrl
//				, dto.getNickname(), dto.getHashTag());
//		
//		bSvc.insertBoard(board);
//		
//		board = bSvc.getBoardShareUrl2(shareUrl);
//		if (board != null)
//		{
//			List<Integer> uidlist = fSvc.getFollowIntegerListByFuid(dto.getUid());
//			
//			if (uidlist.size() > 0)
//			{
//				nC.insertNoticeList(uidlist, 1, board.getBid(), board.getUid());				
//			}
//			
//			return 0;
//		}
//		return -1;
//	}
//
//	@PostMapping("/update")
//	public String boardUpdate(@RequestBody UpdateBoardDto dto) {
//		System.out.println(dto.getTitle());
//		Board board = bSvc.getBoard(dto.getBid());
//		board.setTitle(dto.getTitle());
//		board.setbContents(dto.getbContents());
//		board.setImage(dto.getImage());
//		board.setHashTag(dto.getHashTag());
//		board.setModTime(dto.getModTime());
//		
//		System.out.println(dto.getImage());
//		System.out.println(dto.getModTime());
//		
//		bSvc.updateBoard(board);
//		return "수정되었습니다";
//	}
//	
//	@GetMapping("/delete")
//	public void delete(int bid) {
//		bSvc.deleteBoard(bid);
//	}
//	
//
//		
}
