import SingleFollow from "@/components/SingleFollow";
import useFollowers from "@/hooks/useFollowers";
import Loading from "@/lib/Loading";
import { useOutletContext, useParams } from "react-router-dom";

const Followers = () => {
  const { user } = useOutletContext();
  const { username } = useParams();
  const { isLoading, error, data, refetch } = useFollowers(user._id);

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
      {followers.map((follower) => {
        return (
          <SingleFollow
            key={follower._id}
            follow={follower}
            isFollower={true}
            refetch={refetch}
          />
        );
      })}
    </>
  );
};

export default Followers;
