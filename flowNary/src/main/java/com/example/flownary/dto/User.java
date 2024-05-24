package com.example.flownary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class User {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class RegisterUserDto {
		String hashuid;
		int provider;
		String email;
		String pwd;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UpdateUserDtoBasic {
		int uid;
		String uname;
		String nickname;
		String profile;
		String statusMessage;
		String snsDomain;
		String tel;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UpdateUserDtoPwd {
		int uid;
		String pwd1;
		String pwd2;
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class GetUserNickEmailDto {
		String email;
		String nickname;
		String profile;
	}
}
