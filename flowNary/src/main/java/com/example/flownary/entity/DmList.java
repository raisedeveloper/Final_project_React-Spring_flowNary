package com.example.flownary.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DmList {

	int did;
	int uid;
	int cid;
	String dContents;
	LocalDateTime dTime;
	String dFile;
	int isDeleted;
	String nickname;

	@Override
	public String toString() {
		return "DmList [did=" + did + ", uid=" + uid + ", cid=" + cid + ", dContents=" + dContents + ", dTime=" + dTime
				+ ", dFile=" + dFile + ", isDeleted=" + isDeleted + ", nickname=" + nickname + "]";
	}
	
}
