import SingleFollow from "@/components/SingleFollow";
import useFollowers from "@/hooks/useFollowers";
import Loading from "@/lib/Loading";
import { Follower, OutletContext } from "@/types";
import { useOutletContext } from "react-router-dom";

const Followers = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data } = useFollowers(user._id);

  if (isLoading) {
    return <Loading hScreen={false} small={false} />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  const followers = data.data;

  if (!followers || followers.length === 0) {
    return (
      <div className="h-96 flex justify-center items-center">
        <p>You do not follow anyone</p>
      </div>
    );
  }

  return (
    <>
      {followers.map((follower: Follower) => {
        return (
          <SingleFollow
            key={follower._id}
            follow={follower}
            isFollower={true}
          />
        );
      })}
    </>
  );
};

export default Followers;
