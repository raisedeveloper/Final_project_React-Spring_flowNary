package com.example.flownary.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.flownary.entity.FamilyUser;

@Mapper
public interface FamilyUserDao {

	@Select("select * from familyuser where faid=#{faid} and uid=#{uid}")
	FamilyUser getFamilyUser(int faid, int uid);
	
	@Select("select * from familyuser where faid=#{faid}")
	List<FamilyUser> getFamilyUserList(int faid);
	
	@Select("select * from familyuser where faid=#{faid} and status>-1")
	List<FamilyUser> getFamilyUserListActive(int faid);
	
	@Insert("insert into familyuser values(#{faid}, #{uid}, default, default, #{message})")
	void insertFamilyUser(int faid, int uid, String message);
	
	@Update("update familyuser set status=#{status} where faid=#{faid} and uid=#{uid}")
	void updateFamilyUserStatus(int status, int faid, int uid);
	
	@Update("update familyuser set message=#{message} where faid=#{faid} and uid=#{uid}")
	void updateFamilyUserMessage(String message, int faid, int uid);
}
