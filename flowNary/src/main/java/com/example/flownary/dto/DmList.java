package com.example.flownary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class DmList {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class insertDmList {
		int uid;
		int cid;
		String dContents;
		String dFile;
		String nickname;
		String profile;
		
		public String getdContents() {
			return dContents;
		}
		
		public void setdContents(String dContents) {
			this.dContents = dContents;
		}
		
		public String getdFile() {
			return dFile;
		}
		
		public void setdFile(String dFile) {
			this.dFile = dFile;
		}
	}
}
