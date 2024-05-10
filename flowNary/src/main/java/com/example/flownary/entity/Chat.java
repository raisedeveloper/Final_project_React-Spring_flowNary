package com.example.flownary.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Chat {

	int cid;
	int uid1;
	int uid2;

	@Override
	public String toString() {
		return "Chat [cid=" + cid + ", uid1=" + uid1 + ", uid2=" + uid2 + "]";
	}
	
}
