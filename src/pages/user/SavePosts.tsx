import Post from "@/components/Post/Post";
import useUserSavePosts from "@/hooks/user/useUserSavePosts";
import Loading from "@/lib/Loading";
import { POST, USER } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

type OutletContext = {
  user: USER;
};

const SavePosts = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, isFetching, fetchNextPage } =
    useUserSavePosts(user._id?.toString());

  const { ref, inView } = useInView();

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

      <div ref={ref} className="h-96" />
    </>
  );
};

export default SavePosts;
