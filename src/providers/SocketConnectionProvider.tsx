import useLikeAndCommentSocket from "@/hooks/generals/useLikeAndCommentSocket";
import useNewFollowerToggle from "@/hooks/generals/useNewFollowerToggle";
import useNewPostToggle from "@/hooks/generals/useNewPostToggle";
import useNewReplyPost from "@/hooks/generals/useNewReplyPost";
import useLoginCheck from "@/hooks/useLoginCheck";

const SocketConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: user } = useLoginCheck();

  useNewPostToggle(user);
  useNewReplyPost();
  useLikeAndCommentSocket();
  useNewFollowerToggle(user);

  return <>{children}</>;
};

export default SocketConnectionProvider;
