import { useChat } from "../../hooks/useChat";
import useWebSocket from "../../core/providers/WebSocketContext";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = ({ activityId }: { activityId: string }) => {
    const { chatHistory, sendMessage } = useChat(activityId);
    const { leaveChatRoom } = useWebSocket();
    const lastMessageRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        if (!lastMessageRef.current) return;
        lastMessageRef.current.scrollIntoView({});
        lastMessageRef.current.style.height = '20px';
    }, [chatHistory.length])
    
    console.log("render");
    return (
        <div className="chat-container">
            <button onClick={() => leaveChatRoom(activityId)}>&#10006;</button>
            {activityId.slice(0,6)}
            <div className="messages-container">
                {chatHistory.map((message, index) => (
                    <ChatMessage
                        message={message}
                        key={index} 
                    />)
                )}
                <div ref={lastMessageRef}/>
            </div>
            <ChatInput sendMessage={sendMessage}/>

        </div>
    );
};

export default ChatWindow;