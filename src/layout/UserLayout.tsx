import useUserProfile from "@/hooks/user/useUserProfile";
import Loading from "@/lib/Loading";
import { PARAMS, USER_PROFILE } from "@/types";
import { Outlet, useParams } from "react-router-dom";

const UserLayout = () => {
  const { email } = useParams() as PARAMS;
  const { isLoading, error, data } = useUserProfile(email);

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

  const user = data as USER_PROFILE;

  return (
    <>
      <Outlet context={{ user, email }} />
    </>
  );
};

export default UserLayout;
