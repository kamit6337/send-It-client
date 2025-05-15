import { useRef, useState } from "react";
// import EditProfile from "./EditProfile";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Loading from "@/lib/Loading";
import { USER } from "@/types";

type Props = {
  actualUser: USER;
  currentUser: USER;
  isFollowed: boolean;
  showEdit?: boolean;
};

const UserFollowAndUnfollow = ({
  actualUser,
  currentUser,
  isFollowed,
  showEdit = true,
}: Props) => {
  const [hideScroll, setHideScroll] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, setIsPending] = useState(false);
  const { _id, name, email, photo } = currentUser;

  const isItActualUser = actualUser._id === currentUser._id;

  const userObj = {
    _id,
    name,
    email,
    photo,
  };

  const handleFollow = () => {};
  const handleCancelFollow = () => {};

  const handleScroll = (bool: boolean) => {
    setHideScroll(bool);
  };

  const handleClose = () => {
    closeRef.current?.click();
  };

  if (isItActualUser && showEdit) {
    return (
      <Dialog>
        <DialogTrigger className="w-max px-5 py-2 border border-border rounded-full self-end">
          Edit
        </DialogTrigger>
        <DialogContent
          className={`${
            hideScroll ? "overflow-y-hidden" : "overflow-y-auto"
          } top-[3%] translate-y-0 p-0 max-h-[500px]`}
        >
          {/* <EditProfile
            handleClose={handleClose}
            user={currentUser}
            handleScroll={handleScroll}
          /> */}
          <DialogClose ref={closeRef} asChild className="hidden">
            <button>Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  if (isItActualUser && !showEdit) return;

  if (isFollowed) {
    return (
      <button
        disabled={isPending}
        className="w-max following"
        onClick={handleCancelFollow}
      >
        {isPending ? <Loading /> : "Following"}
      </button>
    );
  }

  return (
    <button
      disabled={isPending}
      className="w-max follow"
      onClick={handleFollow}
    >
      {isPending ? <Loading /> : "Follow"}
    </button>
  );
};

export default UserFollowAndUnfollow;
