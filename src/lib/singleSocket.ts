// socket.ts
import { io, Socket } from "socket.io-client";
import environment from "@/utils/environment";

let socket: Socket | null = null;

const getSocket = (): Socket => {
  if (!socket) {
    socket = io(environment.SERVER_URL, { withCredentials: true });
  }
  return socket;
};

export default getSocket;
