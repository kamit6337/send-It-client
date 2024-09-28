import { useRef, useState } from "react";
import EditProfile from "./EditProfile";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Loading from "@/lib/Loading";
import useNewFollowing from "@/hooks/mutation/FollowAndUnfollow/useNewFollowing";
import useRemoveFollower from "@/hooks/mutation/FollowAndUnfollow/useRemoveFollower";

const UserFollowAndUnfollow = ({
  actualUser,
  currentUser,
  isFollowed,
  showEdit = true,
}) => {
  const [hideScroll, setHideScroll] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const { _id, name, username, photo } = currentUser;
  const isItActualUser = actualUser._id === currentUser._id;

  const { mutate: addFollowingMutate, isPending: isPendingNewFollowing } =
    useNewFollowing(actualUser, _id);
  const { mutate: removeFollowingMutate, isPending: isPendingRemoveFollowing } =
    useRemoveFollower(actualUser, _id);

  const userObj = {
    _id,
    name,
    username,
    photo,
  };

  const handleFollow = () => {
    addFollowingMutate({ id: _id, username, userObj });
  };
  const handleCancelFollow = () => {
    removeFollowingMutate({ id: _id, username, userObj });
  };

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
          <EditProfile
            handleClose={handleClose}
            user={currentUser}
            handleScroll={handleScroll}
          />
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
        disabled={isPendingRemoveFollowing}
        className="w-max following"
        onClick={handleCancelFollow}
      >
        {isPendingRemoveFollowing ? <Loading /> : "Following"}
      </button>
    );
  }

  return (
    <button
      disabled={isPendingNewFollowing}
      className="w-max follow"
      onClick={handleFollow}
    >
      {isPendingNewFollowing ? <Loading /> : "Follow"}
    </button>
  );
};

export default UserFollowAndUnfollow;
