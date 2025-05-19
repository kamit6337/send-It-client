import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useNotification = (socket: Socket) => {
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data) => {
      console.log("notification", data);
    };

    socket.on("notification", handleNewNotification);

    return () => {
      socket.off("notification", handleNewNotification);
    };
  }, [socket]);
};

export default useNotification;
