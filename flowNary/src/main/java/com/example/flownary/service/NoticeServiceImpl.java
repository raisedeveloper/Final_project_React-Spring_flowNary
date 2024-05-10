package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.NoticeDao;
import com.example.flownary.entity.Notice;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NoticeServiceImpl implements NoticeService {

	private final NoticeDao nDao;

	@Override
	public Notice getNotice(int nid) {
		return nDao.getNotice(nid);
	}

	@Override
	public List<Notice> getNoticeList(int uid, int type) {
		return nDao.getNoticeList(uid, type);
	}

	@Override
	public List<Notice> getNoticeListAll(int uid) {
		return nDao.getNoticeListAll(uid);
	}

	@Override
	public void insertNotice(Notice notice) {
		nDao.insertNotice(notice);
	}

	@Override
	public void updateNotice(Notice notice) {
		nDao.updateNotice(notice);
	}

	@Override
	public void removeNotice(Notice notice) {
		nDao.removeNotice(notice);
	}

	@Override
	public void removeNoticeAll(int uid) {
		nDao.removeNoticeAll(uid);
	}
}
