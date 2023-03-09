import { useChat } from "../../hooks/useChat";
import useWebSocket from "../../core/providers/WebSocketContext";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = ({ activityId }: { activityId: string }) => {
    const { sendMessage, chatHistory } = useChat(activityId);
    const { leaveChatRoom } = useWebSocket();
    const [messageInput, setMessageInput] = useState('');
    const lastMessageRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        if (!lastMessageRef.current) return;
        lastMessageRef.current.scrollIntoView({});
        lastMessageRef.current.style.height = '20px';
    }, [chatHistory.length])
  
    const handleMessageChange = (event: any) => {
        setMessageInput(event.target.value)
        event.target.style.height = "30px";
        event.target.style.height = `${event.target.scrollHeight}px`;  
     };
  
     const publishMessage = () => {
        const trimmedMessage = messageInput.trim();
        if (!messageInput || trimmedMessage.length === 0) return;
        sendMessage(trimmedMessage);
        setMessageInput('');
     } 
  
    const handleKeyboardStroke = (event: any) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        publishMessage()
      }
    }
  
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
            <div className="message-input-container">
                <textarea 
                    value={messageInput}
                    placeholder='message'
                    onChange={handleMessageChange}
                    onKeyUp={handleKeyboardStroke}
                />
                <button onClick={publishMessage}>Send</button>
            </div>

        </div>
    );
};

export default ChatWindow;