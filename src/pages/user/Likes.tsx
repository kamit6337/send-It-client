import Post from "@/components/Post/Post";
import useUserLikePosts from "@/hooks/user/useUserLikePosts";
import Loading from "@/lib/Loading";
import { POST } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";

const Likes = () => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useUserLikePosts();

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

  const posts = data?.pages.flatMap((page) => page) as POST[];

  return (
    <>
      <Helmet>
        <title>User Posts</title>
        <meta name="discription" content="User Post page of this project" />
      </Helmet>
      {posts.length > 0 ? (
        posts.map((post) => <Post post={post} key={post._id} />)
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

export default Likes;
