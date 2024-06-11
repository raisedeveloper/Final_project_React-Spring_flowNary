package com.example.flownary.service;

import java.util.List;

import com.example.flownary.entity.Schedule;

public interface ScheduleService {

	Schedule getSchedule(int sid);
	
	List<Schedule> getScheduleList(int uid, String endTime, String startTime);
	
	void insertSchedule(Schedule schedule);
	
	void updateSchedule(Schedule schedule);
	
	void deleteSchedule(int sid);
}
