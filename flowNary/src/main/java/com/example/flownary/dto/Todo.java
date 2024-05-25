package com.example.flownary.dto;


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
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TodoInsertDTO {
	    private SendDataDTO sendData;

	    public SendDataDTO getSendData() {
	        return sendData;
	    }

	    public void setSendData(SendDataDTO sendData) {
	        this.sendData = sendData;
	    }
	}
	
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class SendDataDTO {
	    private int uid;
	    private String contents;
	    
	}
	
}
