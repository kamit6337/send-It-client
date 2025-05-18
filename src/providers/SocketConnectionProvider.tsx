import useExampleSocket from "@/hooks/sockets/useExampleSocket";
import useFollower from "@/hooks/sockets/useFollower";
import useFollowing from "@/hooks/sockets/useFollowing";
import useNewPost from "@/hooks/sockets/useNewPost";
import useNewReply from "@/hooks/sockets/useNewReply";
import useNewRoomAndChat from "@/hooks/sockets/useNewRoomAndChat";
import usePostDetails from "@/hooks/sockets/usePostDetails";
import useUpdateAndDeletePost from "@/hooks/sockets/useUpdateAndDeletePost";
import useUpdateUserBio from "@/hooks/sockets/useUpdateUserBio";
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
  useUpdateAndDeletePost(socket);
  usePostDetails(socket);

  useNewReply(socket);

  useUpdateUserBio(socket);

  useFollowing(socket);
  useFollower(socket);

  useNewRoomAndChat(socket);

  useEffect(() => {
    if (!socket) return;
    socket.emit("isConnected", "I am from Client");
  }, [socket]);

  return <>{children}</>;
};

export default SocketConnectionProvider;
