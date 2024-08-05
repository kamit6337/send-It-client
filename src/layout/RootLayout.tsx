import SearchBar from "@/components/SearchBar";
import SideNavbar from "@/components/SideNavbar";
import useLoginCheck from "@/hooks/useLoginCheck";
import Loading from "@/lib/Loading";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isLoading, error, isSuccess } = useLoginCheck();

  useEffect(() => {
    if (error) {
      navigate(`/signup?msg=${error.message}`);
      return;
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loading hScreen={true} small={false} />;
  }

  if (!isSuccess) return;

  return (
    <main className="w-full flex items-start">
      <div className="sticky top-0 py-2 md:w-80 w-max h-screen border-r border-border">
        <SideNavbar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="w-0 sticky top-0 py-2 lg:w-80 h-screen border-l border-border">
        <SearchBar />
      </div>
    </main>
  );
};

export default RootLayout;
