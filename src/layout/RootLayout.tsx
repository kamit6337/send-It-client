import SideNavbar from "@/components/SideNavbar/SideNavbar";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useUserRooms from "@/hooks/rooms/useUserRooms";
import InitialLoading from "@/lib/InitialLoading";
import Loading from "@/lib/Loading";
import OfflineDetector from "@/lib/OfflineDetector";
import ScrollToTop from "@/lib/ScrollToTop";
import SocketConnectionProvider from "@/providers/SocketConnectionProvider";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isLoading, error, isSuccess } = useLoginCheck();

  const [showInitialLoading, setShowInitialLoading] = useState(() => {
    const value = sessionStorage.getItem("initialLoading");
    if (!value) return true;
    return value === "1" ? false : true;
  });

  const {
    isLoading: isLoadingUserRooms,
    error: errorUserRooms,
    isSuccess: isSuccessUserRooms,
  } = useUserRooms(isSuccess);

  useEffect(() => {
    if (error || errorUserRooms) {
      sessionStorage.setItem("initialLoading", "1");
      setShowInitialLoading(false);
      navigate(`/login?msg=${error?.message || errorUserRooms?.message}`);
    }
  }, [error, errorUserRooms, navigate]);

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("initialLoading", "1");
      setShowInitialLoading(false);
    }
  }, [isSuccess]);

  const handleInitialLoadingTimeout = () => {
    setShowInitialLoading(false); // This will simulate the loading timeout
  };

  if (showInitialLoading) {
    return <InitialLoading onTimeout={handleInitialLoadingTimeout} />;
  }

  if (isLoading || isLoadingUserRooms) {
    return <Loading />;
  }

  if (!isSuccess || !isSuccessUserRooms) {
    return <div>Error: Unable to login. Please try after sometime</div>; // Display error when isSuccess is false
  }

  return (
    <SocketConnectionProvider>
      <OfflineDetector />
      <main className="w-full flex items-start">
        <div className="sticky top-0 lg:w-80 w-max h-screen border-r border-div_border flex flex-col items-center">
          <SideNavbar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      <ScrollToTop />
      <ToastContainer />
    </SocketConnectionProvider>
  );
};

export default RootLayout;
