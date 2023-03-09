import { ChatMessageDT } from "../../core/types/ChatMessageDT";
import "../../styles/chat/ChatMessage.scss";

const ChatMessage = ({message}: { message: ChatMessageDT }) => {
  
    return (
        <div className="chat-message">
            <span className="chat-message-author">{message.author}:</span>
            <span className="chat-message-content">{message.text}</span>
        </div>
    );
};

export default ChatMessage;