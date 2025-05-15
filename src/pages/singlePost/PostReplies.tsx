import Loading from "@/lib/Loading";
import CreateReply from "./CreateReply";
import { POST, USER } from "@/types";
import usePostReplies from "@/hooks/reply/usePostReplies";
import Post from "@/components/Post/Post";

type Props = {
  id: string;
  actualUser: USER;
};

const PostReplies = ({ id, actualUser }: Props) => {
  const { isLoading, error, data } = usePostReplies(id as string);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="h-96 w-full">
        <p>{error.message}</p>
      </div>
    );
  }

  const posts = data?.pages.flatMap((page) => page) as POST[];

  return (
    <div>
      <CreateReply actualUser={actualUser} postId={id} />
      {posts.length > 0 ? (
        posts.map((post) => <Post post={post} key={post._id} isReply={true} />)
      ) : (
        <p className="w-full h-96 flex justify-center items-center">
          No Reply Post yet
        </p>
      )}
    </div>
  );
};

export default PostReplies;
