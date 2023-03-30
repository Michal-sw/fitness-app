import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import useAuth from "./AuthContext";
import { io, Socket } from "socket.io-client";

const websocketPath = process.env.REACT_APP_API_PATH || "http://127.0.0.1:8080";

interface WebSocketContextType {
  socket: Socket | null;
  activeChats: string[];
  joinChatRoom: (roomId: string) => void;
  leaveChatRoom: (roomId: string) => void; 
}

const WebSocketContext = createContext<WebSocketContextType>(
  {} as WebSocketContextType
);

export function WebSocketProvider({ children }: {children: ReactElement }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const { authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) return;
    const socket = io(websocketPath, {path: '/fitness/'});
    setSocket(socket);
    return () => {
        socket.disconnect();
        setSocket(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);


  const joinChatRoom = (roomId: string) => {
    if (activeChats.find(chat => chat === roomId)) return;
    setActiveChats([roomId, ...activeChats]);
  }
  const leaveChatRoom = (roomId: string) => {
    const newActiveChats = activeChats.filter(chat => chat !== roomId);
    setActiveChats(newActiveChats);
  }


  return (
    <WebSocketContext.Provider value={{
        socket,
        activeChats,
        leaveChatRoom,
        joinChatRoom
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default function useWebSocket() {
  return useContext(WebSocketContext);
}
