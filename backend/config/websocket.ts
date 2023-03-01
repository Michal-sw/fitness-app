import { Socket, Server } from 'socket.io';

export const createWebsocketServer = (server: any) => {
    const io: Server = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL
                ? "http://"+process.env.FRONTEND_URL+":3000"
                : "http://127.0.0.1:3000"
        }
    });

    io.on('connection', (socket) => {
        console.log("connected");
        io.emit('message', {
            text: "New user has joined the chat!"
        });

        socket.on('message', async data => {
            console.log("Message received");
            io.emit('message', data)
        })
    })
}  