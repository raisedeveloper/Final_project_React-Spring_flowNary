package com.example.flownary.entity;

import java.time.LocalDateTime;

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
public class Chat {

	int cid;
	int uid1;
	int uid2;
	int status;
	LocalDateTime regTime;
}
