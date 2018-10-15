package com.hjyoon.webchat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Created by hjyoon on 2018-10-11.
 */

@Configuration
@EnableWebSocketMessageBroker		// @EnableWebSocketMessageBroker is used to enable our WebSocket serve
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

	// STOMP stands for Simple Text Oriented Messaging Protocol
	@Override public void registerStompEndpoints(StompEndpointRegistry registry) {


		// Notice the use of withSockJS() with the endpoint configuration.
		// SockJS is used to enable fallback options for browsers that dont support websocket.
		registry.addEndpoint("/ws").withSockJS();
	}

	@Override public void configureMessageBroker(MessageBrokerRegistry registry) {

		// The first line defines that
		// the messages whose destination starts with “/app”
		// should be routed to message-handling methods (we’ll define these methods shortly).
		registry.setApplicationDestinationPrefixes("/app");


		// And, the second line defines that
		// the messages whose destination starts with “/topic” should be routed to the message broker.
		// Message broker broadcasts messages to all the connected clients who are subscribed to a particular topic.
		registry.enableSimpleBroker("/topic");

		// We have enabled a simple in-memory message broker.
		// But you’re free to use any other full-featured message broker like RabbitMQ or ActiveMQ.

	}
}
