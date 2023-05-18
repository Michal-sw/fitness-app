import useWebSocket from "../../core/providers/WebSocketContext";
import "../../styles/chat/Chat.scss";
import ChatWindow from "./ChatWindow";

const ChatList = () => {
  const { activeChats } = useWebSocket();

  return (
    <div id="chat-list-container">
      {activeChats.map((chat) => (
        <ChatWindow key={chat.id} activityId={chat.id} chatTitle={chat.title} />
      ))}
    </div>
  );
};

export default ChatList;
