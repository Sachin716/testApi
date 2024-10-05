import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway(3000 , {
    cors: {
        origin: "*"
    }
})
export class Gateway{


    channels = new Map();


    @WebSocketServer() server: Server;

    @SubscribeMessage('newMessage')
    handleNewMessaeg(client: Socket, data: { user: string, message: string }) {
        let JoinedChannel
        this.channels.forEach((users, channel)=>{
            if(users.includes(client.id)){
                console.log(users.includes(client.id))
                JoinedChannel = channel
            }
        })
        console.log(JoinedChannel)
        this.server.to(JoinedChannel).emit("Server", "Broadcasting my nigga")
    }


    @SubscribeMessage("channel")
    handleChannel(client: Socket, data: { channel: string }) {
        if (!this.channels.has(data.channel)) {
            this.channels.set(data.channel, [])
            this.channels.get(data.channel).push(client.id)
        }
        else {
            this.channels.get(data.channel).push(client.id)
        }
        client.join(data.channel)
        this.server.to(data.channel).emit('room', `userJoined ${client.id}`)
        console.log(` joined ${data.channel} `)
    }



}
