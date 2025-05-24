import Loading from "@/lib/Loading";
import CreateReply from "./CreateReply";
import { POST, USER } from "@/types";
import usePostReplies from "@/hooks/reply/usePostReplies";
import Post from "@/components/Post/Post";
import sortByDate from "@/utils/javascript/sortByDate";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  id: string;
  actualUser: USER;
};

const PostReplies = ({ id, actualUser }: Props) => {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePostReplies(id as string);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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

  const sortedPosts = sortByDate(posts);

  return (
    <>
      <CreateReply actualUser={actualUser} postId={id} />
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <Post post={post} key={post._id} isReply={true} />
        ))
      ) : (
        <p className="w-full h-96 flex justify-center items-center">
          No Reply Post yet
        </p>
      )}
      {isFetchingNextPage && <div>Loading ...</div>}
      <div
        ref={hasNextPage && !isFetchingNextPage ? ref : null}
        className="h-96"
      />
    </>
  );
};

export default PostReplies;
