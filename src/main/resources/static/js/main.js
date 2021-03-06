'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');


var stompClient = null;
var username = null;


var colors= [ '#2196F3', '#32c787', '#00BCD4', '#ff5652','#ffc107', '#ff85af', '#FF9800', '#39bbb0' ];


function connect(event) {

    console.log("call on connect(), event object:")
    console.log(event);
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');

        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    console.log("call onConnected()");
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}

function onError(error) {
    console.log("call onError(), error:" );
    console.log( error);
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function sendMessage(){
    console.log("call sendMessage()");

    // subscribe to the public Topic
    var messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        var chatMessage = { // 메세지 프로토콜 정의
            type: 'CHAT',
            sender: username,
            content: messageInput.value,
            sentAt : ''  // 서버에서 셋업

        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();

}

// 서버로 부터 채팅 메세지 수신  
function onMessageReceived(payload) {
    console.log("call onMessageReceived(), payload:");
    console.log( payload);
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + '님이 대화에 들어오셨습니다. ' + message.sentAt ;
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + '님이 대화를 나가셨습니다.' + message.sentAt ;
    } else if (message.type == 'CHAT' ) {
        messageElement.classList.add('chat-message');

        // 프로필 세팅
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender+' '+ message.sentAt);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);

    }else{
        messageElement.classList.add('event-message');
        message.content = '지원하지 않는 형식의 메세지가 수신되었습니다.';
        console.log("지원되지 않는 형식");
        console.log(payload);

    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


//  사용자 프로필의 배경색을 자동으로 구함 
function getAvatarColor(messageSender) {

    console.log("call getAvatarColor(), messageSender:");
    console.log( messageSender);
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

// 접속 이벤트 등록
usernameForm.addEventListener('submit', connect, true);

// 메세지 발송 이벤트 등록
messageForm.addEventListener('submit', sendMessage, true);
