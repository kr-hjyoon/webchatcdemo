package com.hjyoon.webchat.controller;

import com.hjyoon.webchat.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by user on 2018-10-11.
 */

@Controller
public class ChatController {

	@MessageMapping("chat.sendMessage")
	@SendTo("/topic/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage){

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		chatMessage.setSentAt(df.format(new Date()));

		return chatMessage;
	}

	@MessageMapping("/chat.addUser")
	@SendTo("/topic/public")
	public ChatMessage addUser(@Payload ChatMessage chatMessage,  SimpMessageHeaderAccessor headerAccessor){
		// add username in web Socket session
		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		chatMessage.setSentAt(df.format(new Date()));

		return chatMessage;
	}

}
