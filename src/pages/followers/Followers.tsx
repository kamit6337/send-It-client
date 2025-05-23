import useUserFollowers from "@/hooks/followers/useUserFollowers";
import Loading from "@/lib/Loading";
import { FOLLOWER_USER, USER } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleFollow from "./SingleFollow";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type OutletContext = {
  user: USER;
};

const Followers = () => {
  const { user } = useOutletContext<OutletContext>();
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserFollowers(user._id);

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

  const followers = data?.pages.flatMap((page) => page) as FOLLOWER_USER[];

  return (
    <>
      {followers.length > 0 ? (
        followers.map((follower) => (
          <SingleFollow user={follower} key={follower._id} />
        ))
      ) : (
        <div className="h-96 flex justify-center items-center">
          You have not any followers yet
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-96" />}
      {isFetchingNextPage && <div>Loading ...</div>}
    </>
  );
};

export default Followers;
