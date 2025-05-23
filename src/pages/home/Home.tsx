import Post from "@/components/Post/Post";
import useFollowingUserPosts from "@/hooks/posts/useFollowingUserPosts";
import Loading from "@/lib/Loading";
import { POST, REPLY } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFollowingUserPosts();

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
    return <p>{error.message}</p>;
  }

  const posts = data?.pages.flatMap((page) => page) as REPLY[];

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => {
            const { replies } = post;

            return (
              <>
                {post.replyPost && (
                  <Post post={post.replyPost} showLine={true} />
                )}
                <Post post={post} showLine={replies.length > 0} />
                {replies.length > 0 &&
                  replies.map((reply, i, arr) => {
                    const lastReply = i === arr.length - 1;

                    return <Post post={reply} showLine={!lastReply} />;
                  })}
              </>
            );
          })
        ) : (
          <p className="h-96 flex justify-center items-center">
            No Post available yet
          </p>
        )}
      </div>

      {isFetchingNextPage && <div>Loading ...</div>}
      <div
        ref={hasNextPage && !isFetchingNextPage ? ref : null}
        className="h-96"
      />
    </>
  );
};

export default Home;
