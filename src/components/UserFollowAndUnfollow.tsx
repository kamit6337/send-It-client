import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import Loading from "@/lib/Loading";
import { FOLLOWER_USER, USER_PROFILE } from "@/types";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollowing,
  followingState,
  removeFollowing,
  viewAndAddFollowing,
} from "@/redux/slice/followingSlice";
import Toastify from "@/lib/Toastify";
import getGraphql from "@/utils/api/graphql";
import createNewFollowingSchema, {
  createNewFollowingDataQuery,
} from "@/graphql/followers/createNewFollowingSchema";
import removeSingleFollowingSchema, {
  removeSingleFollowingDataQuery,
} from "@/graphql/followers/removeSingleFollowingSchema";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

type Props = {
  currentUser: USER_PROFILE | FOLLOWER_USER;
  showEdit?: boolean;
};

const UserFollowAndUnfollow = ({ currentUser, showEdit = true }: Props) => {
  const { data: actualUser } = useLoginCheck();
  const dispatch = useDispatch();
  const [hideScroll, setHideScroll] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, setIsPending] = useState(false);
  const { _id: currentUserId, isFollowed: isActualUserFollow } = currentUser;
  const { followings } = useSelector(followingState);
  const { showErrorMessage } = Toastify();

  useEffect(() => {
    if (currentUserId) {
      const obj = { userId: currentUserId, isFollowed: isActualUserFollow };
      dispatch(viewAndAddFollowing(obj));
    }
  }, [currentUserId]);

  const isFollowed = useMemo(() => {
    return followings.includes(currentUserId);
  }, [followings, currentUserId]);

  const handleFollow = async () => {
    try {
      setIsPending(true);

      await getGraphql(createNewFollowingSchema, createNewFollowingDataQuery, {
        userId: currentUserId,
      });

      dispatch(addFollowing(currentUserId));
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "Issue in Follow",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleCancelFollow = async () => {
    try {
      setIsPending(true);

      await getGraphql(
        removeSingleFollowingSchema,
        removeSingleFollowingDataQuery,
        {
          userId: currentUserId,
        }
      );

      dispatch(removeFollowing(currentUserId));
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "Issue in Follow",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleScroll = (bool: boolean) => {
    setHideScroll(bool);
  };

  const handleClose = () => {
    closeRef.current?.click();
  };

  const isItActualUser = actualUser._id === currentUserId;

  if (isItActualUser && showEdit) {
    return (
      <Dialog>
        <DialogTrigger className="w-max px-5 py-2 border border-border rounded-full self-end">
          Edit
        </DialogTrigger>
        <DialogContent
          className={`${
            hideScroll ? "overflow-y-hidden" : "overflow-y-auto"
          } top-[3%] translate-y-0 p-0 max-h-[500px] w-full max-w-2xl`}
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
        disabled={isPending}
        className="w-max following"
        onClick={handleCancelFollow}
      >
        {isPending ? <Loading height={"full"} small={true} /> : "Following"}
      </button>
    );
  }

  return (
    <button
      disabled={isPending}
      className="w-max follow"
      onClick={handleFollow}
    >
      {isPending ? <Loading height={"full"} small={true} /> : "Follow"}
    </button>
  );
};

export default UserFollowAndUnfollow;
