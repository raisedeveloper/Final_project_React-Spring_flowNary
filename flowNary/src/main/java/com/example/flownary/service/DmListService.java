package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.DmList;

public interface DmListService {

	DmList getDmList(int did);
	
	List<DmList> getDmListList(int cid, int count);
	
	List<DmList> getDmListListByUid(int uid, int count);
	
	void insertDmList(DmList dmList);
	
	void deleteDmList(int did);
}
