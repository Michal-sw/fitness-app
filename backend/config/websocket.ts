import { Socket, Server } from 'socket.io';

export const createWebsocketServer = (server: any) => {
    const io: Server = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL
                ? process.env.FRONTEND_URL
                : "http://127.0.0.1:3000"
        }
    });

    io.on('connection', (socket) => {
        io.emit('message', {
            text: "New user has joined the chat!"
        });

        socket.on('activityChat/', (data) => {
            const { room, author, text } = data;

            io.emit(`activityChat/${room}`, data);
        })
    })
}  