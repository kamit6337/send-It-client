import useLoginCheck from "@/hooks/auth/useLoginCheck";
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

  useEffect(() => {
    if (error) {
      sessionStorage.setItem("initialLoading", "1");
      setShowInitialLoading(false);
      navigate(`/login?msg=${error.message}`);
    }
  }, [error]);

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

  if (isLoading) {
    return <Loading />;
  }

  if (!isSuccess) {
    return <div>Error: Unable to login. Please try after sometime</div>; // Display error when isSuccess is false
  }

  return (
    <SocketConnectionProvider>
      <OfflineDetector />
      <Outlet />
      <ScrollToTop />
      <ToastContainer />
    </SocketConnectionProvider>
  );
};

export default RootLayout;
