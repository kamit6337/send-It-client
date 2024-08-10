import useUserProfile from "@/hooks/useUserProfile";
import Loading from "@/lib/Loading";
import { useOutletContext } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";

const UserLayout = () => {
  const { username } = useParams();
  const { isLoading, error, data } = useUserProfile(username);
  const { actualUser } = useOutletContext();

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
    <>
      <Outlet context={{ user, actualUser }} />
    </>
  );
};

export default UserLayout;
