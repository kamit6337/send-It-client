import useUserFollowings from "@/hooks/followers/useUserFollowings";
import Loading from "@/lib/Loading";
import { FOLLOWER_USER, USER } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleFollow from "./SingleFollow";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

type OutletContext = {
  user: USER;
};

const Following = () => {
  const { user } = useOutletContext<OutletContext>();
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserFollowings(user._id);

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

  const followings = data?.pages.flatMap((page) => page) as FOLLOWER_USER[];

  return (
    <>
      <Helmet>
        <title>User Followings</title>
        <meta name="messages" content="User followings page of this project" />
      </Helmet>
      {followings.length > 0 ? (
        followings.map((following) => (
          <SingleFollow user={following} key={following._id} />
        ))
      ) : (
        <div className="h-96 flex justify-center items-center">
          You do not follow anyone
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-96" />}
      {isFetchingNextPage && <div>Loading ...</div>}
    </>
  );
};

export default Following;
