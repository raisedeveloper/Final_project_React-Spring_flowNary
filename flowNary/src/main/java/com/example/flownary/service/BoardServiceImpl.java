package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.BoardDao;
import com.example.flownary.entity.Board;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
	
	private final BoardDao boardDao;
	
	@Override
	public Board getBoard(int bid) {
		return boardDao.getBoard(bid);
	}

	@Override
	public int getBoardShareUrl(String ShareUrl) {
		return boardDao.getBoardShareUrl(ShareUrl);
	}
	
	@Override
	public Board getBoardShareUrl2(String ShareUrl) {
		return boardDao.getBoardShareUrl2(ShareUrl);
	}
	
	@Override
	public int getBoardCount(String field, String query) {
		query = "%" + query + "%";
		return boardDao.getBoardCount(field, query);
	}

	@Override
	public List<Board> getBoardList(int count, String field, String query) {
		//int offset = (page - 1) * COUNT_PER_PAGE;
		query = "%" + query + "%";
		return boardDao.getBoardList(field, query, count);
	}

	@Override
	public List<Board> getBoardListSearch(int count, List<String> field, String query) {
		query = "%" + query + "%";
		
		if (field.size() == 1)
		{
			return boardDao.getBoardList(field.get(0), query, count);
		}
		else if (field.size() == 2)
		{
			return boardDao.getBoardList2(field.get(0), field.get(1), query, count);
		}
		else
		{
			return boardDao.getBoardList3(field.get(0), field.get(1), field.get(2), query, count);			
		}
	}
	
	@Override
	public void insertBoard(Board board) {
		boardDao.insertBoard(board);
	}

	@Override
	public void updateBoard(Board board) {
		boardDao.updateBoard(board);
	}

	@Override
	public void updateBoardNickname(int uid, String nickname) {
		boardDao.updateBoardNickname(uid, nickname);
	}

	@Override
	public void deleteBoard(int bid) {
		boardDao.deleteBoard(bid);
	}

	@Override
	public void updateReplyCount(int bid, int replyCount) {
		boardDao.updateReplyCount(bid, replyCount);
	}

	@Override
	public void updateLikeCount(int bid, int likecount) {
		boardDao.updateLikeCount(bid, likecount);
	}

	@Override
	public void updateViewCount(int bid) {
		boardDao.updateViewCount(bid);
	}
}
