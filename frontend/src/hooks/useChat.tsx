import { useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessageDT } from "../core/types/ChatMessageDT";
import useAuth from "../core/providers/AuthContext";

function createMessageObject(text: string, author: string) {
    return { text, author, date: new Date()}
}

export function ChatProvider({ activityId }: {activityId: string }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessageDT[]>([]);
    const { user, authenticated } = useAuth();
    const chatRoomPath = `activityChat/${activityId}`;

    useEffect(() => {
        if (!authenticated) return;
        const socket = io('http://localhost:8080');
        socket.on(chatRoomPath, (data: ChatMessageDT) => {
            console.log(data);
        })
        socket.emit(chatRoomPath, { author: user.login, text: "Just entered the chat!" })
        setSocket(socket);
    }, [authenticated]);

    function sendMessage(text: string) {
        const newMessage = createMessageObject(text, user.login);
        setChatHistory([...chatHistory, newMessage]);
        socket?.emit(chatRoomPath, newMessage);
    }

    const chatActions = useMemo(() => ({
        sendMessage,
    }), [])
      
      return {
        chatHistory,
        chatActions,
      };
    
}
