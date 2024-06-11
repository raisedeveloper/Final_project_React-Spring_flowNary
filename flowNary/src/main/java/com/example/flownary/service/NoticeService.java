package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Notice;

public interface NoticeService {

	Notice getNotice(int nid);
	
	Notice getNoticeUid(int uid, int suid, int type, int oid);
	
	List<Notice> getNoticeList(int uid, int type);
	
	int getNoticeCount(int uid);
	
	int getNoticeCountType(int uid, int type);
	
	int getNoticeCountObject(int oid, int uid, int type);
	
	List<Notice> getNoticeListAll(int uid);
	
	int insertNotice(Notice notice);
	
	void insertNoticeList(List<Notice> list);
	
	void updateNotice(Notice notice);
	
	void removeNotice(int nid);
	
	void removeNoticeAll(int uid);
	
	void disableNoticeAll(int uid);
	
	void disableNoticeAllChat(int uid);
	
	void removeNoticeSpecific(int uid, int type, int oid);
}
