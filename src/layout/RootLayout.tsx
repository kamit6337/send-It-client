import SideNavbar from "@/components/SideNavbar";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserRooms from "@/hooks/useUserRooms";
import Loading from "@/lib/Loading";
import SocketConnectionProvider from "@/providers/SocketConnectionProvider";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const navigate = useNavigate();
  const { isLoading, error, isSuccess, data: actualUser } = useLoginCheck();

  const { isLoading: isLoadingUserRoom, error: isErrorUserRooms } =
    useUserRooms(isSuccess, actualUser);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if ((isLoading || isLoadingUserRoom) && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft, isLoading, isLoadingUserRoom]);

  useEffect(() => {
    if (secondsLeft === 0) {
      // You can handle the timeout here (e.g., redirect the user, display an error, etc.)
      navigate("/signup?msg=Session timed out, please log in again.");
    }
  }, [secondsLeft, navigate]);

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
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
        <Loading hScreen={false} small={false} />
        <p>{secondsLeft} seconds left</p>
      </div>
    );
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
