package com.example.flownary.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.flownary.entity.Family;

@Mapper
public interface FamilyDao {

	@Select("select * from family where fid=#{faid}")
	Family getFamily(int faid);
	
	@Select("select * from family f"
			+ " join familyUser u on u.uid=#{uid} and f.uid=u.uid"
			+ " where status>-1")
	List<Family> getFamilyList(int uid);
	
	@Insert("insert into family values(default, default, now(), #{name})")
	void insertFamily(String name);
	
	
}
