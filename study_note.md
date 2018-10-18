


+ sockjs 란
    * WebSocket과 유사한 객체를 제공하는 브라우저 JavaScript 라이브러리임.
    * 브라우저와 웹 서버간에 low altency ,full duplex ,  cross-domain , crossdomain 통신채널을 위한  JS API를 제공
    * 웹 소켓을 최우선으로 시도,  실패 할 경우 다양한 브라우저 별 전송 프로토콜을 사용하여 WebSocket과 같은 추상화를 통해 제공
    * SockJS는 최신의 모든 브라우저와 WebSocket 프로토콜을 지원하지 않는 환경에서 작동

+ sock.js 기본 사용법
    ```
    var sock = new SockJS('https://mydomain.com/my_prefix');
    sock.onopen = function() {     // 연결시
        console.log('open');
        sock.send('test');
    };
 
    sock.onmessage = function(e) { // 메세지 수신시
        console.log('message', e.data);
        sock.close();
    };
    
    sock.onclose = function() {    // 연결 종료시
        console.log('close');
    };
    ```
 
* STOMP 이란?
    - Simple/Streaming Text Oriented Messaging Protocol 의 약자 
    - 스트리밍 텍스트 기반의 간단한 스트리밍 메시지 프로토콜
    - HTTP로 부터 영감을 받은 디자인 덕분에 읽고 쓰기가 매우 쉽다는 장점이 있음. 
    - 단순하며, 읽고 쓰기가 쉽다는 것은 클라이언트 측에서는 당연한 장점 대신 서버측에서 구현해야 할게 많아짐
    (서버는 알아서 잘 만들어 주겠지)
       
* STOME Frames 구조
    ```
       COMMAND
       header1:value1
       header2:value2
       
       Body^@
    ```

+ 참고 소스 
    -  https://www.callicoder.com/spring-boot-websocket-chat-example/

+ 추가 기능
    - 메세지 한글화 (done)
    - 한글 인코딩 추가 (done)
    - 입장/퇴장/메세지발송 시간 추가 (done)
    - 입장시  이름 중복 시  입장 차단 기능



