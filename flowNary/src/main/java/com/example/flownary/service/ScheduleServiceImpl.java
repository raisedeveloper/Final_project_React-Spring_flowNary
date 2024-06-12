package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.ScheduleDao;
import com.example.flownary.entity.Schedule;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

	private final ScheduleDao scDao;

	@Override
	public Schedule getSchedule(int sid) {
		return scDao.getSchedule(sid);
	}

	@Override
	public List<Schedule> getScheduleList(int uid, String endTime, String startTime) {
		return scDao.getScheduleList(uid, endTime, startTime);
	}

	@Override
	public void insertSchedule(Schedule schedule) {
		scDao.insertSchedule(schedule);
	}

	@Override
	public void updateSchedule(Schedule schedule) {
		scDao.updateSchedule(schedule);
	}

	@Override
	public void deleteSchedule(int sid) {
		scDao.deleteSchedule(sid);
	}
}
