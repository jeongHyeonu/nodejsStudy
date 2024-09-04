import { WebSocketGateway,WebSocketServer,SubscribeMessage,MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";

// namespace - chat 을 사용하는 게이트웨이
@WebSocketGateway({namespace:'chat'})
export class ChatGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    handleDisconnect(client: any) {
        console.log('Client disconnected');
        console.log(client.id);
    }
    handleConnection(client: any, ...args: any[]) {
        console.log('Client connected');
        console.log(client.id);
    }
    afterInit() {
        console.log('Server initialized');
    }

    @WebSocketServer() server:Server // 웹소켓 서버 인스턴스 선언

    @SubscribeMessage('message') // message 이벤트 구독
    handleMessage(socket:Socket, data:any): void{
        const {message,nickname} = data;
        // 메시지 전송
        socket.broadcast.emit('message',`${nickname}: ${message}`);
    }
}

// namespace - room 을 사용하는 게이트웨이
@WebSocketGateway({namespace:'room'})
export class RoomGateway{
    // 게이트웨이 의존성 주입
    constructor(private readonly chatGateway:ChatGateway){}
    rooms = [];

    @WebSocketServer() server:Server // 서버 인스턴스

    @SubscribeMessage('getRooms')
    getRooms(@ConnectedSocket() socket: Socket) {
      this.server.emit('rooms', this.rooms);
    }

    @SubscribeMessage('createRoom')
    handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket){ // 소켓 없이 데이터만 받음
        const {nickname,room} = data;
        // 방 생성 시 이벤트 발생 - 클라이언트에게 송신
        this.chatGateway.server.emit('notice',{
            message:`${nickname}님이 ${room}방을 만들었습니다.`
        })
        this.rooms.push(room); // 채팅방 정보 받아서 추가
        this.server.emit('rooms',this.rooms); // rooms 이벤트로 채팅방 리스트 전송
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data, @ConnectedSocket() socket: Socket){
        const {nickname,room,toLeaveRoom} = data;
        socket.leave(toLeaveRoom);
        this.chatGateway.server.emit('notice',{
            message:`${nickname}님이 ${room}방에 입장했습니다.`
        })
        socket.join(room);
    }

    @SubscribeMessage('message')
    handleMessageToRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
      const { nickname, room, message } = data;
      console.log(data);
      socket.broadcast.to(room).emit('message', {
        message: `${nickname}: ${message}`,
      });
    }
}