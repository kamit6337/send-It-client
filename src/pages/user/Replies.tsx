import Post from "@/components/Post/Post";
import PostDetails from "@/components/Post_Details/PostDetails";
import useUserReplyPosts from "@/hooks/user/useUserReplyPosts";
import Loading from "@/lib/Loading";
import { REPLY, USER } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

type OutletContext = {
  user: USER;
};

const Replies = () => {
  const { user } = useOutletContext<OutletContext>();
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useUserReplyPosts(user._id);

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
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  const reply = data?.pages.flatMap((page) => page) as REPLY[];

  return (
    <>
      <Helmet>
        <title>User Reply</title>
        <meta name="discription" content="User Post page of this project" />
      </Helmet>
      {reply.length > 0 ? (
        reply.map((reply) => {
          const posts = reply.replies;
          return (
            <div key={reply._id}>
              <Post post={reply} showLine={true} />
              {posts.map((post, i, arr) => {
                const lastPost = i === arr.length - 1;

                if (lastPost)
                  return <PostDetails post={post} userReply={false} />;

                return <Post post={post} showLine={true} />;
              })}
            </div>
          );
        })
      ) : (
        <div className="h-96 flex justify-center items-center">
          You don't have any post
        </div>
      )}

      {isFetchingNextPage && <div>Loading ...</div>}
      <div
        ref={hasNextPage && !isFetchingNextPage ? ref : null}
        className="h-96"
      />
    </>
  );
};

export default Replies;
