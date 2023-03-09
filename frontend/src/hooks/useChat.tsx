import { useEffect, useState } from "react";
import { ChatMessageDT } from "../core/types/ChatMessageDT";
import useAuth from "../core/providers/AuthContext";
import useWebSocket from "../core/providers/WebSocketContext";

function createMessageObject(text: string, author: string, room: string) {
    return { text, author, date: new Date(), room }
}

export function useChat(activityId: string) {
    const [chatHistory, setChatHistory] = useState<ChatMessageDT[]>([]);
    const { user } = useAuth();
    const { socket } = useWebSocket();

    const chatRoomPath = `activityChat/${activityId}`;
    const chatServerPath = 'activityChat/';

    useEffect(() => {
        if (!socket) return;

        socket.on(chatRoomPath, (data: ChatMessageDT) => {
            receiveMessage(data);
        })
        socket.emit(chatServerPath, { author: user.login, text: "Just entered the chat!", room: activityId });

        return () => {
            socket.off(chatRoomPath);
        }
    }, [socket?.connected]);

    function receiveMessage(message: ChatMessageDT) {
        if (message.author === user.login) return;
        setChatHistory(history => [...history, message]);
    }

    function sendMessage(text: string) {
        const newMessage = createMessageObject(text, user.login, activityId);
        setChatHistory([...chatHistory, newMessage]);
        socket?.emit(chatServerPath, newMessage);
    }
      
    return {
        chatHistory,
        sendMessage,
    };
    
}
