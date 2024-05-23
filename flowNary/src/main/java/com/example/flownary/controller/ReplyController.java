package com.example.flownary.controller;

import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flownary.dto.Re_Reply.InsertReReply;
import com.example.flownary.dto.Reply.InsertReply;
import com.example.flownary.dto.User.GetUserNickEmailDto;
import com.example.flownary.entity.Board;
import com.example.flownary.entity.Re_Reply;
import com.example.flownary.entity.Reply;
import com.example.flownary.service.BoardService;
import com.example.flownary.service.Re_ReplyService;
import com.example.flownary.service.ReplyService;
import com.example.flownary.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class ReplyController {

	private final ReplyService rSvc;
	private final Re_ReplyService rrSvc;
	private final UserService uSvc;
	private final NoticeController nC;
	private final BoardService bSvc;
	
	@GetMapping("/list")
	public JSONArray replyList(@RequestParam int bid,
			@RequestParam int offset, @RequestParam int limit) {
		List<Reply> list = rSvc.getReplyList(bid, offset, limit);
		JSONArray jArr = new JSONArray();
		for(Reply reply :list) {
			JSONObject jreply = new JSONObject();
			GetUserNickEmailDto user = uSvc.getUserNicknameEmail(reply.getUid());
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
	
	@GetMapping("/re_list")
	public JSONArray re_ReplyList(@RequestParam int rid) {
		List<Re_Reply> list = rrSvc.getReReplyList(rid);
		JSONArray jArr = new JSONArray();
		for(Re_Reply re_Reply :list) {
			JSONObject jre_Reply = new JSONObject();
			GetUserNickEmailDto user = uSvc.getUserNicknameEmail(re_Reply.getUid());
			jre_Reply.put("rrid", re_Reply.getRrid());
			jre_Reply.put("rid", re_Reply.getRid());
			jre_Reply.put("uid", re_Reply.getUid());
			jre_Reply.put("rrContents", re_Reply.getRrContents());
			jre_Reply.put("modTime", re_Reply.getModTime());
			jre_Reply.put("likeCount", re_Reply.getLikeCount());
			jre_Reply.put("nickname", re_Reply.getNickname());
			jre_Reply.put("profile", user.getProfile());
			jArr.add(jre_Reply);
		}
		return jArr;
	}
	
	@PostMapping("/insert")
	public void reply(@RequestBody InsertReply dto) {
		Reply reply = new Reply(dto.getBid(),dto.getUid(),dto.getrContents(),dto.getNickname());
		rSvc.insertReply(reply);
		
        // 댓글 조회수
		Board board = bSvc.getBoard(dto.getBid());
		int replyCount = board.getReplyCount();
		bSvc.updateReplyCount(dto.getBid(), replyCount);
		
		nC.insertNotice(dto.getUid(), 2, dto.getBid(), board.getUid());
	}
	
	@PostMapping("/re_insert")
	public String Re_reply(@RequestBody InsertReReply dto) {
		System.out.println(dto.getRid());
		System.out.println(dto.getRrContents());
		@SuppressWarnings("static-access")
		Re_Reply re_Reply = new Re_Reply().builder().rid(dto.getRid()).uid(dto.getUid())
				.rrContents(dto.getRrContents()).nickname(dto.getNickname()).build();
		rrSvc.insertReReply(re_Reply);
		Reply reply = rSvc.getReply(dto.getRid());
		
		nC.insertNotice(dto.getUid(), 2, dto.getRid(), reply.getUid());
		
		System.out.println(re_Reply);
		
		return "대댓글이 입력되었습니다";
	}
	
	@PostMapping("/delete")
	public int deleteReply(@RequestBody JSONObject rid) {
		System.out.println(rid);
//		rSvc.deleteReply(rid);
		
		return 0;
	}
	
	@PostMapping("/re_delete")
	public int deleteReReply(@RequestBody JSONObject rrid) {
		System.out.println((Integer) rrid.get("rrid"));
		int rrid2 = (Integer) rrid.get("rrid");
		System.out.println(rrid2);
		rrSvc.deleteReReply(rrid2);
		
		return 0;
	}
}
