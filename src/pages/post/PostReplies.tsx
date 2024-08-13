import usePostReplies from "@/hooks/usePostReplies";
import Loading from "@/lib/Loading";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { useEffect, useState } from "react";
import CreateReply from "./CreateReply";
import { onNewReply } from "@/lib/socketIO";
import Post from "@/components/Post";
import { type Reply, User } from "@/types";

type Props = {
  id: string;
  actualUser: User;
};

const PostReplies = ({ id, actualUser }: Props) => {
  const [page, setPage] = useState(1);
  const [replies, setReplies] = useState<Reply[]>([]);
  const { isLoading, error, data } = usePostReplies(id as string, page);

  useEffect(() => {
    onNewReply((response: Reply) => {
      const { post } = response;

      console.log("response reply", response);

      if (post === id) {
        setReplies((prev) => [response, ...prev]);
      }
    });
  }, [id]);

  useEffect(() => {
    if (data) {
      setReplies((prev) => {
        const generateUnique = generateUniqueIDArray([...data.data, ...prev]);
        return generateUnique;
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-96 w-full">
        <Loading hScreen={false} small={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 w-full">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <CreateReply actualUser={actualUser} postId={id} />
      {replies.map((reply) => {
        return <Post key={reply._id} post={reply.replyPost} isReply={true} />;
      })}
    </div>
  );
};

export default PostReplies;
