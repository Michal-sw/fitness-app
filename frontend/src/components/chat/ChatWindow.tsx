import { useChat } from "../../hooks/useChat";
import useWebSocket from "../../core/providers/WebSocketContext";
import { useEffect, useMemo, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatWindow = ({ activityId }: { activityId: string }) => {
  const { chatHistory, sendMessage } = useChat(activityId);
  const { leaveChatRoom } = useWebSocket();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView({});
    lastMessageRef.current.style.height = "20px";
  }, [chatHistory.length]);

  const activityVisibleId = useMemo(() => activityId.slice(0, 6), [activityId]);

  return (
    <div className="chat-container">
      <button onClick={() => leaveChatRoom(activityId)}>&#10006;</button>
      <p>{activityVisibleId}</p>
      <div className="messages-container">
        {chatHistory.map((message, index) => (
          <ChatMessage message={message} key={index} />
        ))}
        <div ref={lastMessageRef} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
