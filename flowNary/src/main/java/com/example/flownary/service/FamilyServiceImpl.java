package com.example.flownary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.flownary.dao.FamilyDao;
import com.example.flownary.entity.Family;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FamilyServiceImpl implements FamilyService {

	private final FamilyDao faDao;

	@Override
	public Family getFamily(int faid) {
		return faDao.getFamily(faid);
	}

	@Override
	public List<Family> getFamilyList(int uid) {
		return faDao.getFamilyList(uid);
	}

	@Override
	public int insertFamily(Family family) {
		return faDao.insertFamily(family);
	}

	@Override
	public void updateFamily(String name, int fid) {
		faDao.updateFamily(name, fid);
	}

	@Override
	public void deleteFamily(int fid) {
		faDao.deleteFamily(fid);
	}
}
