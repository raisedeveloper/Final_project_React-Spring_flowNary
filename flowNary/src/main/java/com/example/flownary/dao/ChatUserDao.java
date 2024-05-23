package com.example.flownary.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.flownary.entity.ChatUser;

@Mapper
public interface ChatUserDao {

	@Select("select * from ChatUser"
			+ " where cid=#{cid} and uid=#{uid}")
	ChatUser getChatUser(int cid, int uid);
	
	@Insert("insert into ChatUser values(#{cid}, #{uid}, default, default)")
	void insertChatUser(int cid, int uid);
	
	@Update("update ChatUser set status=#{status}, statusTime=now()"
			+ " where cid=#{cid} and uid=#{uid}")
	void updateChatUser(int status, int cid, int uid);
}
