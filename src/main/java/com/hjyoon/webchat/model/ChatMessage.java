package com.hjyoon.webchat.model;



import java.sql.Timestamp;

/**
 * Created by user on 2018-10-11.
 */
public class ChatMessage {

		private MessageType type;
		private String content;
		private String sender;
		private String sentAt;

		public String getSentAt() {
			return sentAt;
		}

		public void setSentAt(String sentAt) {
			this.sentAt = sentAt;
		}

		public enum MessageType{
			CHAT,
			JOIN,
			LEAVE
		}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getSender() {

		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public MessageType getType() {

		return type;
	}

	public void setType(MessageType type) {
		this.type = type;
	}
}
