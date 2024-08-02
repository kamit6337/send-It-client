import Header from "@/components/Header";
import useLoginCheck from "@/hooks/useLoginCheck";
import Loading from "@/lib/Loading";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isLoading, error, isSuccess } = useLoginCheck();

  useEffect(() => {
    if (error) {
      navigate(`/login?msg=${error.message}`);
      return;
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loading hScreen={true} small={false} />;
  }

  if (!isSuccess) return;

  return (
    <>
      <div className="h-16 w-full bg-primary text-primary-foreground">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
