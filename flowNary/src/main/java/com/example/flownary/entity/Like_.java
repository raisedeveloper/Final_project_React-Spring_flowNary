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
public class Like_ {

	int lid;
	int uid;
	int fuid;
	int type;
	int oid;
	LocalDateTime time;
	int stat;
	
	@Override
	public String toString() {
		return "Like_ [lid=" + lid + ", uid=" + uid + ", fuid=" + fuid + ", type=" + type + ", oid=" + oid + ", time="
				+ time + ", stat=" + stat + "]";
	}
	
}
