import ReactIcons from "@/assets/icons";
import { OutletContext } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet, useOutletContext, useParams } from "react-router-dom";

const FollowerLayout = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useOutletContext<OutletContext>();
  const { pathname } = useLocation();

  const isFollowing = pathname === `/${username}/following`;
  const isFollower = pathname === `/${username}/follower`;
  return (
    <section>
      <div className="sticky z-20 top-0 pt-2 bg-background flex flex-col gap-5 px-5 border-b border-div_border">
        <div className="flex items-center gap-5">
          <button className="left_arrow" onClick={() => navigate(-1)}>
            <ReactIcons.leftArrow className="text-xl" />
          </button>
          <div className="">
            <p className="text-xl font-semibold tracking-wider">{user.name}</p>
            <p className="text-grey text-sm">@{user.username}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            to={`/${username}/following`}
            className={`flex-1 flex justify-center items-center hover:bg-gray-100 h-10  `}
          >
            <p
              className={`${
                isFollowing ? "border-b-4 border-sky_blue" : ""
              } h-full w-max px-2 flex items-center `}
            >
              Followings
            </p>
          </Link>
          <Link
            to={`/${username}/follower`}
            className={`flex-1 flex justify-center items-center hover:bg-gray-100 h-10 `}
          >
            <p
              className={`${
                isFollower ? "border-b-4 border-sky_blue" : ""
              } h-full w-max px-2 flex items-center `}
            >
              Followers
            </p>
          </Link>
        </div>
      </div>
      <Outlet context={{ user, username }} />
    </section>
  );
};

export default FollowerLayout;
