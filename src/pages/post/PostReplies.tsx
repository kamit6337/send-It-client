import usePostReplies from "@/hooks/usePostReplies";
import Loading from "@/lib/Loading";
import CreateReply from "./CreateReply";
import Post from "@/components/Post";
import { User, Reply } from "@/types";

type Props = {
  id: string;
  actualUser: User;
};

const PostReplies = ({ id, actualUser }: Props) => {
  const { isLoading, error, data } = usePostReplies(id as string);

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
      {data?.pages?.map((page) => {
        return page.map((reply: Reply) => {
          const { replyPost } = reply;
          return <Post post={replyPost} key={replyPost._id} isReply={true} />;
        });
      })}
    </div>
  );
};

export default PostReplies;
