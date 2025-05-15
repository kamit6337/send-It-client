import useExampleSocket from "@/hooks/sockets/useExampleSocket";
import useNewPost from "@/hooks/sockets/useNewPost";
import useNewReply from "@/hooks/sockets/useNewReply";
import usePostDetails from "@/hooks/sockets/usePostDetails";
import getSocket from "@/lib/socketConnection";
import { useEffect } from "react";

const SocketConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = getSocket();

  useExampleSocket(socket);
  useNewPost(socket);
  usePostDetails(socket);
  useNewReply(socket);

  useEffect(() => {
    if (!socket) return;
    socket.emit("isConnected", "I am from Client");
  }, [socket]);

  return <>{children}</>;
};

export default SocketConnectionProvider;
