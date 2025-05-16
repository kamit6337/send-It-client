import ReactIcons from "@/assets/icons";
import navlinks from "@/data/navlinks";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Toastify from "@/lib/Toastify";
// import CreateNewPost from "./CreateNewPost";
import { useRef } from "react";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Profile from "./Profile";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import Cookies from "js-cookie";

const SideNavbar = () => {
  const { pathname } = useLocation();
  const { showErrorMessage } = Toastify();
  const navigate = useNavigate();
  const { data: user } = useLoginCheck();

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      Cookies.remove("_use");
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

  const handleClose = () => {
    closeRef.current?.click();
  };

  return (
    <>
      <nav className="py-2 flex flex-col h-full justify-between items-center md:items-stretch md:px-2">
        <NavLink
          to={`/`}
          className="p-3 md:px-4 md:py-2 w-max rounded-full hover:bg-sidebar_link_hover"
        >
          <ReactIcons.twitterLogo className="text-3xl" />
        </NavLink>
        {navlinks.map((obj, i) => {
          const { href, name, outline: OutlineIcon, solid: SolidIcon } = obj;

          let to: string = href;

          if (to === "/profile") {
            to = user?.email;
          }

          const singleMessageHref =
            to === "/messages" && pathname.startsWith("/messages/");

          return (
            <NavLink
              to={to}
              key={i}
              className={({ isActive }) =>
                isActive ? "font-semibold w-max" : "font-medium w-max"
              }
            >
              <div className="lg:p-3 p-2 rounded-full flex items-center gap-1 lg:gap-3 hover:bg-sidebar_link_hover">
                <p className="text-2xl lg:text-3xl ">
                  {pathname === href || singleMessageHref ? (
                    <SolidIcon />
                  ) : (
                    <OutlineIcon />
                  )}
                </p>
                <p className="lg:text-[20px] text-base hidden md:block">
                  {name}
                </p>
              </div>
            </NavLink>
          );
        })}

        <Dialog>
          <DialogTrigger>
            <div className="hidden bg-sky_blue text-white rounded-full md:flex justify-center py-3 font-semibold tracking-widest cursor-pointer hover:bg-sky-600">
              Post
            </div>
            <div className="w-max md:hidden bg-sky_blue  text-white rounded-full flex justify-center p-4 font-semibold tracking-wider cursor-pointer hover:bg-sky-600">
              <ReactIcons.plus />
            </div>
          </DialogTrigger>
          <DialogContent className="top-[10%] translate-y-0 w-full max-w-2xl max-h-[500px] overflow-auto p-0">
            <div className="mt-5">
              <CreateNewPost user={user} handleClose={handleClose} />
            </div>
            <DialogClose ref={closeRef} asChild className="hidden">
              <button>close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mt-8">
            <Profile />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full mb-2 " align="end">
            <DropdownMenuItem
              className="px-20 py-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default SideNavbar;
