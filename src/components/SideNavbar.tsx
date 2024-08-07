import ReactIcons from "@/assets/icons";
import navlinks from "@/data/navlinks";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getAuthReq } from "@/utils/api/authApi";
import useLoginCheck from "@/hooks/useLoginCheck";

const SideNavbar = () => {
  const { pathname } = useLocation();
  const { showErrorMessage } = Toastify();
  const navigate = useNavigate();
  const { data: user } = useLoginCheck();

  const handleLogout = async () => {
    try {
      await getAuthReq("/logout");
      navigate("/signup");
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
      <nav className="md:pl-10 px-2 flex flex-col h-full justify-between items-center md:items-stretch">
        <NavLink
          to={`/`}
          className="p-3 md:px-4 md:py-2 w-max rounded-full hover:bg-slate-800"
        >
          <ReactIcons.twitterLogo className="text-3xl" />
        </NavLink>
        {navlinks.map((obj, i) => {
          const { href, name, outline: OutlineIcon, solid: SolidIcon } = obj;

          let to = href;

          if (to === "/profile") {
            to = user.username;
          }

          return (
            <NavLink
              to={to}
              key={i}
              className={({ isActive }) =>
                isActive ? "font-semibold" : "font-medium"
              }
            >
              <div className="w-fit p-3   rounded-full flex items-center gap-3 hover:bg-slate-800">
                <p className="text-2xl md:text-3xl ">
                  {pathname === href ? <SolidIcon /> : <OutlineIcon />}
                </p>
                <p className="text-[20px] hidden md:block">{name}</p>
              </div>
            </NavLink>
          );
        })}
        <div className="hidden bg-sky_blue rounded-full mr-10 md:flex justify-center py-3 font-semibold tracking-wider cursor-pointer hover:bg-sky-600">
          Post
        </div>
        <div className="w-max md:hidden bg-sky_blue rounded-full flex justify-center p-4 font-semibold tracking-wider cursor-pointer hover:bg-sky-600">
          <ReactIcons.plus />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full md:pr-4 mt-8">
            <Profile />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full mb-2">
            <DropdownMenuItem
              className="px-20 py-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <ToastContainer />
    </>
  );
};

export default SideNavbar;
