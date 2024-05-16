package com.example.flownary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class Chat {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class InsertChatDto {
		int uid1;
		int uid2;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class updateChatDto {
		int cid;
		int uid;
	}
}
