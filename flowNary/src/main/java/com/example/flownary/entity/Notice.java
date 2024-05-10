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
public class Notice {

	int nid;
	int uid;
	int type;
	int oid;
	String nContents;
	LocalDateTime regTime;
	int onOff;
	
	@Override
	public String toString() {
		return "Notice [nid=" + nid + ", uid=" + uid + ", type=" + type + ", oid=" + oid + ", nContents=" + nContents
				+ ", regTime=" + regTime + ", onOff=" + onOff + "]";
	}
	
}
