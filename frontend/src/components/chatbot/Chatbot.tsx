import "../../styles/chatbot/Chatbot.scss";

import React, { useState } from "react";

import { Slide } from "@mui/material";
import axios from "axios";
import useNotifications from "../../hooks/useNotifications";

const Chatbot = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [request, setRequest] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const { actions } = useNotifications();

  const getResponse = async () => {
    axios
      .post("http://localhost:5001/", { data: request })
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch(() => {
        actions.addNotification("Could not get response from chatbot");
      });
  };

  const handleVisibilityChange = () => {
    setVisible(!isVisible);
  };

  return (
    <>
      <Slide direction="left" in={isVisible}>
        <div className="container">
          <div className="bot_container">
            <div>
              <h1>Chat</h1>
              <button className="spacedRight" onClick={handleVisibilityChange}>
                Close
              </button>
            </div>
            <input
              onChange={(e) => setRequest(e.target.value)}
              placeholder={"Chat with chatbot"}
            />
            <button onClick={getResponse}>Get chatbot response</button>
            <span>{response}</span>
          </div>
        </div>
      </Slide>
      <button id="open_chatbot" onClick={handleVisibilityChange}>
        Chatbot
      </button>
    </>
  );
};

export default Chatbot;
