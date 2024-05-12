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

import com.example.flownary.entity.Board;
import com.example.flownary.entity.Like_;
import com.example.flownary.entity.Re_Reply;
import com.example.flownary.entity.Reply;
import com.example.flownary.entity.User;
import com.example.flownary.service.BoardService;
import com.example.flownary.service.LikeService;
import com.example.flownary.service.Re_ReplyService;
import com.example.flownary.service.ReplyService;
import com.example.flownary.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class BoardController {
	private final UserService uSvc;
	private final BoardService bSvc;
	private final LikeService lSvc;
	private final ReplyService rSvc;
	private final Re_ReplyService ReReSvc;
	private final NoticeController nC;
	
	@GetMapping("/getBoard")
	public JSONObject getBoard(@RequestParam int bid,
			@RequestParam(defaultValue="-1", required=false) int uid) {
		Board board = bSvc.getBoard(bid);
		int liked = lSvc.getLikeUidCount(uid, 1, bid);
		User user = uSvc.getUser(board.getUid());
		
		HashMap<String, Object> hMap = new HashMap<String, Object>();
		
		hMap.put("bid", board.getBid());
		hMap.put("uid", board.getUid());
		hMap.put("title", board.getTitle());
		hMap.put("bContents", board.getbContents());
		hMap.put("modTime", board.getModTime());
		hMap.put("viewCount", board.getViewCount());
		hMap.put("likeCount", board.getLikeCount());
		hMap.put("replyCount", board.getReplyCount());
		hMap.put("image", board.getImage());
		hMap.put("shareUrl", board.getShareUrl());
		hMap.put("isDeleted", board.getIsDeleted());
		hMap.put("hashTag", board.getHashTag());
		hMap.put("nickname", board.getNickname());
		hMap.put("liked", (liked == 1) ? true : false);
		hMap.put("profile", (user != null) ? user.getProfile() : null);
		JSONObject jBoard = new JSONObject(hMap);
		
		return jBoard;
	}
	
	@GetMapping("/getBoardUrl")
	public JSONObject getBoardUrl(@RequestParam String url,
			@RequestParam(defaultValue="-1", required=false) int uid) {
		Board board = bSvc.getBoardShareUrl2(url);
		
		HashMap<String, Object> hMap = new HashMap<String, Object>();
		
		if (board != null)
		{
			int liked = lSvc.getLikeUidCount(uid, 1, board.getBid());
			User user = uSvc.getUser(board.getUid());
			hMap.put("bid", board.getBid());
			hMap.put("uid", board.getUid());
			hMap.put("title", board.getTitle());
			hMap.put("bContents", board.getbContents());
			hMap.put("modTime", board.getModTime());
			hMap.put("viewCount", board.getViewCount());
			hMap.put("likeCount", board.getLikeCount());
			hMap.put("replyCount", board.getReplyCount());
			hMap.put("image", board.getImage());
			hMap.put("shareUrl", board.getShareUrl());
			hMap.put("isDeleted", board.getIsDeleted());
			hMap.put("hashTag", board.getHashTag());
			hMap.put("nickname", board.getNickname());
			hMap.put("liked", (liked == 1) ? true : false);
			hMap.put("profile", user.getProfile());
			JSONObject jBoard = new JSONObject(hMap);
			return jBoard;
		}
		else
		{
			return null;
		}
	}
	
	@GetMapping("/list")
	public JSONArray boardList(@RequestParam(name="c", defaultValue="1", required=false) int count,
			@RequestParam(name="f", defaultValue="title", required=false) String field,
			@RequestParam(name="f2", defaultValue="", required=false) String field2,
			@RequestParam(name="f3", defaultValue="", required=false) String field3,
			@RequestParam(name="q", defaultValue="", required=false) String query,
			@RequestParam(defaultValue="1", required=false) int type,
			@RequestParam(defaultValue="-1", required=false) int uid) {
		
		List<Board> list = new ArrayList<>();
		
		switch(type) {
		case 1:
			list = bSvc.getBoardList(count, field, query);			
			break;
		case 2:
			List<String> fieldList = new ArrayList<>();
			fieldList.add(field);
			fieldList.add(field2);
			list = bSvc.getBoardListSearch(count, fieldList, query);
			break;
		case 3: 
			List<String> fieldList1 = new ArrayList<>();
			fieldList1.add(field);
			fieldList1.add(field2);
			fieldList1.add(field3);
			list = bSvc.getBoardListSearch(count, fieldList1, query);
			break;
		default:
			System.out.println("error!");
			break;
		}
		
		JSONArray jArr = new JSONArray();
		for(Board board:list) {
			HashMap<String, Object> hMap = new HashMap<String, Object>();
			int liked = lSvc.getLikeUidCount(uid, 1, board.getBid());
			User user = uSvc.getUser(board.getUid());
			
 			hMap.put("bid", board.getBid());
			hMap.put("uid", board.getUid());
			hMap.put("title", board.getTitle());
			hMap.put("bContents", board.getbContents());
			hMap.put("modTime", board.getModTime());
			hMap.put("viewCount", board.getViewCount());
			hMap.put("likeCount", board.getLikeCount());
			hMap.put("replyCount", board.getReplyCount());
			hMap.put("image", board.getImage());
			hMap.put("shareUrl", board.getShareUrl());
			hMap.put("isDeleted", board.getIsDeleted());
			hMap.put("hashTag", board.getHashTag());
			hMap.put("nickname", board.getNickname());
			hMap.put("liked", (liked == 1) ? true : false);
			hMap.put("profile", user.getProfile());
			JSONObject jBoard = new JSONObject(hMap);
			
			jArr.add(jBoard);
		}
		return jArr;
	}
	
	@GetMapping("/replyList")
	public JSONArray replyList(@RequestParam int bid,
			@RequestParam int offset, @RequestParam int limit) {
		List<Reply> list = rSvc.getReplyList(bid, offset, limit);
		JSONArray jArr = new JSONArray();
		for(Reply reply :list) {
			JSONObject jreply = new JSONObject();
			User user = uSvc.getUser(reply.getUid());
 			jreply.put("rid", reply.getRid());
 			jreply.put("bid", reply.getBid());
 			jreply.put("uid", reply.getUid());
 			jreply.put("rContents", reply.getrContents());
 			jreply.put("modTime", reply.getModTime());
 			jreply.put("likeCount", reply.getLikeCount());
 			jreply.put("nickname", reply.getNickname());
 			jreply.put("profile", user.getProfile());
			jArr.add(jreply);
		}
		return jArr;
	}
	
	@GetMapping("/re_ReplyList")
	public JSONArray re_ReplyList(@RequestParam int rid) {
		List<Re_Reply> list = ReReSvc.getReReplyList(rid);
		JSONArray jArr = new JSONArray();
		for(Re_Reply re_Reply :list) {
			JSONObject jre_Reply = new JSONObject();
			User user = uSvc.getUser(re_Reply.getUid());
			jre_Reply.put("rrid", re_Reply.getRrid());
			jre_Reply.put("rid", re_Reply.getRid());
			jre_Reply.put("uid", re_Reply.getUid());
			jre_Reply.put("rrContetnts", re_Reply.getRrContents());
			jre_Reply.put("modTime", re_Reply.getModTime());
			jre_Reply.put("likeCount", re_Reply.getLikeCount());
			jre_Reply.put("nickname", re_Reply.getNickname());
			jre_Reply.put("profile", user.getProfile());
			jArr.add(jre_Reply);
		}
		return jArr;
		
	}
	
	
	@PostMapping("/insert")
	public int insertForm(@RequestBody Board dto) {
		
		String shareUrl = "";
		boolean t = true;
		
		while (t)
		{
			shareUrl = RandomStringUtils.randomAlphanumeric(10);
			
			if (bSvc.getBoardShareUrl(shareUrl) == 0)
			{
				t = false;
				break;
			}
		}
		
		Board board = new Board(dto.getUid(), dto.getTitle()
				, dto.getbContents(), dto.getImage(), shareUrl
				, dto.getNickname(), dto.getHashTag());
		
		bSvc.insertBoard(board);
		return 0;
	}

	@PostMapping("/update")
	public String boardUpdate(@RequestBody Board dto,
			HttpSession session) {
		int sessUid = (int) session.getAttribute("sessUid");
		Board board = new Board(sessUid, dto.getTitle(), dto.getbContents(), dto.getImage(),
				dto.getShareUrl(),dto.getHashTag());
		bSvc.updateBoard(board);
		return "수정되었습니다";
	}
	
	@PostMapping("/reply")
	public void reply(@RequestBody Reply dto) {
		Reply reply = new Reply(dto.getBid(),dto.getUid(),dto.getrContents(),dto.getNickname());
		rSvc.insertReply(reply);
		
        // 댓글 조회수
		Board board = bSvc.getBoard(dto.getBid());
		int replyCount = board.getReplyCount();
		bSvc.updateReplyCount(dto.getBid(), replyCount);
		
		nC.insertNotice(dto.getUid(), 2, dto.getBid(), board.getUid());
	}
	
	@PostMapping("/Re_Reply")
	public String Re_reply(@RequestBody Re_Reply dto) {
		Re_Reply re_Reply = new Re_Reply().builder().rid(dto.getRid()).uid(dto.getUid())
				.rrContents(dto.getRrContents()).nickname(dto.getNickname()).build();
		ReReSvc.insertReReply(re_Reply);
		
		return "대댓글이 입력되었습니다";
	}
	
	@GetMapping("/delete")
	public void delete(int bid) {
		bSvc.deleteBoard(bid);
	}
	
	@PostMapping("/like")
	public String like(@RequestBody Like_ dto) {
		Like_ like = lSvc.getLikeUid(dto.getUid(), 1, dto.getOid());
		
		if(like == null) {
			like = new Like_();
			like.setType(1);
			like.setOid(dto.getOid());
			like.setFuid(dto.getFuid());
			like.setUid(dto.getUid());
			
			lSvc.insertLike(like);
		}
		else {
			if (like.getStat() == 0)
			{
				lSvc.remakeLike(like.getLid());				
			}
			else
			{
				lSvc.removeLike(like.getLid());
			}
		}
		
		bSvc.updateLikeCount(dto.getOid(), lSvc.getLikeCount(1, dto.getOid()));
		
		return "좋아요";
	}
		
}
