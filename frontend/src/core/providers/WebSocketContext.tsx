import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import useAuth from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>(
  {} as WebSocketContextType
);

export function WebSocketProvider({ children }: {children: ReactElement }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) return;
    const socket = io('http://localhost:8080');
    setSocket(socket);
    return () => {
        socket.disconnect();
        setSocket(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default function useWebSocket() {
  return useContext(WebSocketContext);
}
