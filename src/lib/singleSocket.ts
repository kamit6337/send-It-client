// socket.ts
import { io, Socket } from "socket.io-client";
import environment from "@/utils/environment";

let socket: Socket | null = null;

const getSocket = (): Socket => {
  if (!socket) {
    socket = io(environment.SERVER_URL, {
      withCredentials: true,
      reconnection: true, // Enable reconnection
      reconnectionAttempts: Infinity, // Try to reconnect indefinitely
      reconnectionDelay: 1000, // Start with 1 second delay between reconnection attempts
      reconnectionDelayMax: 5000, // Maximum delay between attempts
      timeout: 20000, // Timeout for connection attempt
    });
  }
  return socket;
};

export default getSocket;
