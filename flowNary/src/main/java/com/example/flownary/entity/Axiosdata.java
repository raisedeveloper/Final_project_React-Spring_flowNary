package com.example.flownary.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Axiosdata {

	private int uid;
	private int bid;
	private int rid;
	private int rrid;
	private int cid;
	
	private String email;
	private String profile;
}
