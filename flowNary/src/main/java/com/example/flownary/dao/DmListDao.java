package com.example.flownary.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.flownary.entity.DmList;

@Mapper
public interface DmListDao {

	@Select("select * from dmlist where did=#{did}")
	DmList getDmList(int did);
	
	@Select("select * from dmlist where cid=#{cid}")
	List<DmList> getDmListList(int cid);
	
	@Select("select * from dmlist where uid=#{uid}")
	List<DmList> getDmListListByUid(int uid);
	
	@Insert("insert into dmlist values(default, #{uid}, #{cid}, #{dContents}"
			+ ", default, #{dFile}, default)")
	void insertDmList(DmList dmList);
	
	@Update("update dmlist set isDeleted=-1 where did=#{did}")
	void deleteDmList(int did);
}
