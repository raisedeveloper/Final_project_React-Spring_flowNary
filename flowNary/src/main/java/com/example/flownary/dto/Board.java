package com.example.flownary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class Board {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class InsertBoardDto {
		int uid;
		String title;
		String bContents;
		String image;
		String nickname;
		String hashTag;
		
		public String getbContents() {
			return bContents;
		}

		public void setbContents(String bContents) {
			this.bContents = bContents;
		}
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class UpdateBoardDto {
		String title;
		String bContents;
		String image;
		String hashTag;
		
		public String getbContents() {
			return bContents;
		}

		public void setbContents(String bContents) {
			this.bContents = bContents;
		}
	}
}
