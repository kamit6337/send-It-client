import SingleFollow from "@/components/SingleFollow";
import useFollowing from "@/hooks/useFollowing";
import Loading from "@/lib/Loading";
import { useOutletContext } from "react-router-dom";

const Following = () => {
  const { user } = useOutletContext();

  const { isLoading, error, data, refetch } = useFollowing(user._id);

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

  const followings = data.data;

  if (!followings || followings.length === 0) {
    return (
      <div className="h-96 flex justify-center items-center">
        <p>You do not follow anyone</p>
      </div>
    );
  }

  return (
    <>
      {followings.map((following) => {
        return (
          <SingleFollow
            key={following._id}
            follow={following}
            refetch={refetch}
          />
        );
      })}
    </>
  );
};

export default Following;
