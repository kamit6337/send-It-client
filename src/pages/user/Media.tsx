import Loading from "@/lib/Loading";
import { POST, USER } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleMedia from "./SingleMedia";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import useUserMedia from "@/hooks/user/useUserMedia";

type OutletContext = {
  user: USER;
};

const Media = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, fetchNextPage, isFetching } = useUserMedia(
    user._id
  );
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
        posts.map((post) => <SingleMedia post={post} key={post._id} />)
      ) : (
        <div className="h-96 flex justify-center items-center">
          You don't have any post
        </div>
      )}

      <div ref={ref} className="h-96" />
    </>
  );
};

export default Media;
