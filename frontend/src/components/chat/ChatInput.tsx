import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  sendMessage,
}: {
  sendMessage: (text: string) => void;
}) => {
  const [messageInput, setMessageInput] = useState("");

  const handleMessageChange = (event: any) => {
    setMessageInput(event.target.value);
    event.target.style.height = "30px";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const publishMessage = () => {
    const trimmedMessage = messageInput.trim();
    if (!messageInput || trimmedMessage.length === 0) return;
    sendMessage(trimmedMessage);
    setMessageInput("");
  };

  const handleKeyboardStroke = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      publishMessage();
    }
  };

  return (
    <div className="message-input-container">
      <textarea
        value={messageInput}
        placeholder="message"
        onChange={handleMessageChange}
        onKeyUp={handleKeyboardStroke}
      />
      <SendIcon className="send-icon" onClick={publishMessage} />
    </div>
  );
};

export default ChatInput;
