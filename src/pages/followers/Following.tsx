import useUserFollowings from "@/hooks/followers/useUserFollowings";
import Loading from "@/lib/Loading";
import { USER } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleFollow from "./SingleFollow";

type OutletContext = {
  user: USER;
};

const Following = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data } = useUserFollowings(user._id);

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

  const followings = data?.pages.flatMap((page) => page) as USER[];

  return (
    <>
      {followings.length > 0 ? (
        followings.map((following) => (
          <SingleFollow user={following} key={following._id} />
        ))
      ) : (
        <div className="h-96 flex justify-center items-center">
          You do not follow anyone
        </div>
      )}
    </>
  );
};

export default Following;
