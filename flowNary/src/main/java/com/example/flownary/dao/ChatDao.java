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
			+ " where uid1=#{uid1} and uid2=#{uid2}")
	Chat getChatUid(int uid1, int uid2);
	
	@Select("select c.* from chat c"
			+ " join chatuser u on c.cid=u.cid and u.uid=#{uid}"
			+ " where (c.uid1=#{uid} or c.uid2=#{uid}) and u.status>-1"
			+ " order by u.status desc, u.statusTime desc"
			+ " limit #{count}")
	List<Chat> getChatList(int uid, int count);
	
	@Select("select c.* from chat c"
			+ " join chatuser u on c.cid=u.cid and u.uid=#{uid}"
			+ " where (c.uid1=#{uid} or c.uid2=#{uid}) and u.status=1"
			+ " order by u.status desc, u.statusTime desc"
			+ " limit #{count}")
	List<Chat> getChatListImportant(int uid, int count);
	
	@Insert("insert into chat values(default, #{uid1}, #{uid2}, default, default)")
	void insertChat(Chat chat);
	
	@Update("update chat set status=#{status} where cid=#{cid}")
	void updateChat(int status, int cid);
	
	@Update("update chat set status=-1 where cid=#{cid}")
	void deleteChat(int cid);
}
