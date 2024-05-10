package com.example.flownary.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.flownary.entity.Chat;

@Mapper
public interface ChatDao {

	@Select("select * from chat"
			+ " where cid=#{cid}")
	Chat getChat(int cid);
	
	@Select("select * from chat"
			+ " where (uid1=#{uid} or uid2=#{uid}) and status=0")
	List<Chat> getChatList(int uid);
	
	@Select("select * from chat"
			+ " where (uid1=#{uid} or uid2=#{uid}) and status=1")
	List<Chat> getChatListImportant(int uid);
	
	@Insert("insert into chat values(default, #{uid1}, #{uid2}, default)")
	void insertChat(Chat chat);
	
	@Update("update chat set status=#{status} where cid=#{cid}")
	void updateChat(int status, int cid);
	
	@Update("update chat set status=-1 where cid=#{cid}")
	void deleteChat(int cid);
}
