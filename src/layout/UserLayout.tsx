import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <p>UserLayout</p>
      <Outlet />
    </div>
  );
};

export default UserLayout;
