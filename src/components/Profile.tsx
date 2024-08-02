import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getAuthReq } from "@/utils/api/authApi";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Profile = () => {
  const { showErrorMessage } = Toastify();
  const navigate = useNavigate();
  const { data: user } = useLoginCheck();

  const handleLogout = async () => {
    try {
      await getAuthReq("/logout");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 py-2">
            <div className="w-8">
              <img
                src={user.photo}
                alt={user.name}
                className="w-full rounded-full"
              />
            </div>
            <p>{user.name.split(" ")[0]}</p>
            <p>
              <ReactIcons.downArrow />
            </p>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white hover:bg-gray-50">
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer tracking-wider"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
    </>
  );
};

export default Profile;
