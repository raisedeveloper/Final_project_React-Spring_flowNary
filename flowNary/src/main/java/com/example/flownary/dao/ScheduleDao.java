package com.example.flownary.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.flownary.entity.Schedule;

@Mapper
public interface ScheduleDao {

	@Select("select * from schedule where sid=#{sid}")
	Schedule getSchedule(int sid);
	
	@Select("select * from schdule"
			+ " where uid=#{uid} and startTime<=#{endTime} and endTime>=#{startTime}")
	List<Schedule> getScheduleList(int uid, String endTime, String startTime);
	
	@Insert("insert into schedule values(default, #{uid}, #{title}, #{memo}, #{place}"
			+ ", #{startTime}, #{endTime}, default)")
	void insertSchedule(Schedule schedule);
	
	@Update("update schedule set title=#{title}, memo=#{memo}, place=#{place}"
			+ ", startTime=#{startTime}, endTime=#{endTime}, status=#{status} where sid=#{sid}")
	void updateSchedule(Schedule schedule);
	
	@Delete("delete from schedule where sid=#{sid}")
	void deleteSchedule(int sid);
}
