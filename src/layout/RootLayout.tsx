import SideNavbar from "@/components/SideNavbar";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserRooms from "@/hooks/useUserRooms";
import Loading from "@/lib/Loading";
import SocketConnectionProvider from "@/providers/SocketConnectionProvider";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isLoading, error, isSuccess, data: actualUser } = useLoginCheck();

  const { isLoading: isLoadingUserRoom, error: isErrorUserRooms } =
    useUserRooms(isSuccess, actualUser);

  useEffect(() => {
    if (error) {
      navigate(`/signup?msg=${error.message}`);
      return;
    }

    if (isErrorUserRooms) {
      navigate(`/signup?msg=${isErrorUserRooms.message}`);
      return;
    }
  }, [error, isErrorUserRooms, navigate]);

  if (isLoading || isLoadingUserRoom) {
    return <Loading hScreen={true} small={false} />;
  }

  if (!isSuccess) return;

  return (
    <SocketConnectionProvider>
      <main className="w-full flex items-start">
        <div className="sticky top-0 lg:w-80 w-max h-screen border-r border-div_border flex flex-col items-center">
          <SideNavbar />
        </div>
        <div className="flex-1">
          <Outlet context={{ actualUser }} />
        </div>
      </main>
    </SocketConnectionProvider>
  );
};

export default RootLayout;
