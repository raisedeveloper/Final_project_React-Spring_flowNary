package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Follow;

public interface FollowService {

	Follow getFollow(int fid);
	
	List<Follow> getFollowList(int uid);
	
	List<Follow> getFollowListByFuid(int fuid);
	
	void insertFollow(Follow follow);
	
	void deleteFollow(int fid);
}
