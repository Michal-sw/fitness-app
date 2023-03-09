import useAuth from "../../core/providers/AuthContext";
import { ChatMessageDT } from "../../core/types/ChatMessageDT";
import "../../styles/chat/ChatMessage.scss";

const ChatMessage = ({message}: { message: ChatMessageDT }) => {
    const { user } = useAuth();
    const isAuthor = message.author === user.login;

    return (
        <div className={`chat-message ${isAuthor ? 'local-user' : null}`}>
            {!isAuthor && 
                <span className="chat-message-author">{message.author}:</span>
            }
            <span className="chat-message-content">{message.text}</span>
        </div>
    );
};

export default ChatMessage;