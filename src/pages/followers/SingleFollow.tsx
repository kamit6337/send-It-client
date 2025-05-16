import UserFollowAndUnfollow from "@/components/UserFollowAndUnfollow";
import { USER } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  user: USER;
};

const SingleFollow = ({ user }: Props) => {
  const { name, email, photo } = user;

  return (
    <>
      <div className="w-full px-10 py-3 flex justify-between items-center hover:bg-sidebar_link_hover border-b border-div_border">
        <Link to={`/${email}`} className="flex items-center gap-3">
          <div className="w-10 md:w-12">
            <img src={photo} alt={name} className="w-full rounded-full" />
          </div>
          <div>
            <p>{name}</p>
            <p className="username">{email}</p>
          </div>
        </Link>
        <UserFollowAndUnfollow currentUser={user} showEdit={false} />
      </div>
    </>
  );
};

export default SingleFollow;
