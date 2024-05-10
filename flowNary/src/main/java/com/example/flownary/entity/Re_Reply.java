package com.example.flownary.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Re_Reply {

	int rrid;
	int rid;
	int uid;
	String rrContents;
	LocalDateTime modTime;
	int likeCount;
	String nickname;
	int isDeleted;

	@Override
	public String toString() {
		return "Re_Reply [rid=" + rid + ", rrid=" + rrid + ", uid=" + uid + ", rrContents=" + rrContents + ", modTime="
				+ modTime + ", isDeleted=" + isDeleted + ", nickname=" + nickname + "]";
	}
	
}
