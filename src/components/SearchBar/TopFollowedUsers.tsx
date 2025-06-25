import useTopFollowedUsers from "@/hooks/followers/useTopFollowedUsers";
import Loading from "@/lib/Loading";
import { useNavigate } from "react-router-dom";
import UserFollowAndUnfollow from "../UserFollowAndUnfollow";
import { FOLLOWER_USER } from "@/types";

const TopFollowedUsers = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useTopFollowedUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const users = data as FOLLOWER_USER[];

  return (
    <div className="border rounded-2xl py-4 space-y-5">
      <p className="font-semibold text-lg tracking-wide px-4">Who to Follow</p>
      <div>
        {users.length > 0 ? (
          users.map((user) => {
            const { _id, name, email, photo } = user;

            return (
              <div
                key={_id}
                className="hover:bg-post_hover_bg px-4 py-2 cursor-pointer flex justify-between"
                onClick={() => navigate(`/${email}`)}
              >
                <div className="flex gap-2">
                  <div className="w-10">
                    <img
                      src={photo}
                      alt={name}
                      className="w-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold tracking-wide">{name}</p>
                    <p className="text-sm text-gray-500 w-32 truncate">
                      {email}
                    </p>
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <UserFollowAndUnfollow currentUser={user} showEdit={false} />
                </div>
              </div>
            );
          })
        ) : (
          <div>No users</div>
        )}
      </div>
    </div>
  );
};

export default TopFollowedUsers;
