import useUserProfile from "@/hooks/useUserProfile";
import Loading from "@/lib/Loading";
import { Outlet, useParams } from "react-router-dom";

const links = ["post", "likes", "reply", "saved"];

const UserLayout = () => {
  const { username } = useParams();

  const { isLoading, error, data } = useUserProfile(username);

  if (isLoading) {
    return <Loading hScreen={true} small={false} />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  const user = data.data;

  return (
    <section>
      <div className="w-full border-b border-border">
        <div className="h-60 w-full bg-gray-100 relative"></div>
        <div className="w-full relative">
          <div className="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-36 rounded-full p-1 bg-background ml-5">
            <img
              src={user.photo}
              className="w-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="px-5 flex flex-col">
          <button className="w-max my-5 px-5 py-2 border border-border rounded-full self-end">
            Edit
          </button>
          <div className="mt-5">
            <p className="text-xl font-semibold tracking-wider">{user.name}</p>
            <p className="text-grey text-sm">@{user.username}</p>
          </div>

          <div className="flex justify-between">
            {links.map((obj, i) => {
              return <button key={i}>{obj}</button>;
            })}
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default UserLayout;
