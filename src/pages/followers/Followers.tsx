import useUserFollowers from "@/hooks/followers/useUserFollowers";
import Loading from "@/lib/Loading";
import { USER } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleFollow from "./SingleFollow";

type OutletContext = {
  user: USER;
};

const Followers = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data } = useUserFollowers(user._id);

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

  const followers = data?.pages.flatMap((page) => page) as USER[];

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
    </>
  );
};

export default Followers;
