package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Family;

public interface FamilyService {

	Family getFamily(int faid);
	
	List<Family> getFamilyList(int uid);
	
	int insertFamily(Family family);
	
	void updateFamily(String name, int fid);
	
	void deleteFamily(int fid);
}
