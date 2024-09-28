import useLikeAndCommentSocket from "@/hooks/generals/useLikeAndCommentSocket";
import useNewFollowerToggle from "@/hooks/generals/useNewFollowerToggle";
import useNewPostToggle from "@/hooks/generals/useNewPostToggle";
import useNewReplyPost from "@/hooks/generals/useNewReplyPost";
import useNotifications from "@/hooks/generals/useNotifications";
import useRoomAndChatIO from "@/hooks/generals/useRoomAndChatIO";
import useLoginCheck from "@/hooks/useLoginCheck";
import { keepAliveConnection } from "@/lib/socketIO";
import { useEffect } from "react";

const SocketConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: user } = useLoginCheck();

  useEffect(() => {
    const keepAliveInterval = setInterval(() => {
      keepAliveConnection();
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(keepAliveInterval);
    };
  }, []);

  useNewPostToggle(user);
  useNewReplyPost();
  useLikeAndCommentSocket();
  useNewFollowerToggle(user);
  useRoomAndChatIO(user);
  useNotifications();

  return <>{children}</>;
};

export default SocketConnectionProvider;
