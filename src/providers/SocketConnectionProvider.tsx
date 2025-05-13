import useExampleSocket from "@/hooks/sockets/useExampleSocket";
import getSocket from "@/lib/socketConnection";
import { useEffect } from "react";

const SocketConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = getSocket();

  useExampleSocket(socket);

  useEffect(() => {
    if (!socket) return;
    socket.emit("isConnected", "I am from Client");

    const handleNewPost = (data) => {
      console.log("new data", data);
    };

    socket.on("new-post", handleNewPost);

    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, [socket]);

  return <>{children}</>;
};

export default SocketConnectionProvider;
