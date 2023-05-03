import useWebSocket from "../../core/providers/WebSocketContext";
import "../../styles/chat/Chat.scss";
import ChatWindow from "./ChatWindow";

const ChatList = () => {
  const { activeChats } = useWebSocket();

  return (
    <div id="chat-list-container">
      {activeChats.map((roomId) => (
        <ChatWindow key={roomId} activityId={roomId} />
      ))}
    </div>
  );
};

export default ChatList;
