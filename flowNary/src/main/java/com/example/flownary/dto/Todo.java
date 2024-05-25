package com.example.flownary.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class Todo {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class todoDto {
		int tid;
		int uid;
		String contents;
		int pri;


//		int gender;
//		String location;
	}
	
	
}
