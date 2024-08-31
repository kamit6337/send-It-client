import {
  offNewFollower,
  offRemoveFollower,
  onNewFollower,
  onRemoveFollower,
} from "@/lib/socketIO";
import { User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNewFollowerToggle = (user: User) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewFollower = (obj) => {
      console.log("handleNewFollower", obj);

      const checkUserProfileStatus = queryClient.getQueryState([
        "user profile",
        obj?.user.username,
      ]);

      if (checkUserProfileStatus) {
        queryClient.setQueryData(
          ["user profile", obj?.user.username],
          (old) => {
            return { ...old, followersCount: old.followersCount + 1 };
          }
        );
      }

      const checkUserFollowerStatus = queryClient.getQueryState([
        "user followers",
        obj?.user._id,
      ]);

      if (checkUserFollowerStatus) {
        queryClient.setQueryData(["user followers", obj.user._id], (old) => {
          const newObj = { ...obj };
          delete newObj.user;

          const newPages = [...old.pages];
          newPages[0] = [newObj, ...newPages[0]];
          return { ...old, pages: newPages };
        });
      }
    };

    const handleRemoveFollower = (obj) => {
      console.log("handleRemoveFollower", obj);

      const checkUserProfileStatus = queryClient.getQueryState([
        "user profile",
        obj?.user.username,
      ]);

      if (checkUserProfileStatus) {
        queryClient.setQueryData(
          ["user profile", obj?.user.username],
          (old) => {
            return { ...old, followersCount: old.followersCount - 1 };
          }
        );
      }

      const checkUserFollowerStatus = queryClient.getQueryState([
        "user followers",
        obj?.user._id,
      ]);

      if (checkUserFollowerStatus) {
        queryClient.setQueryData(["user followers", obj.user._id], (old) => {
          const newPages = old.pages.map((page) => {
            return page.filter(
              (follow) => follow.follower._id !== obj.follower._id
            );
          });
          return { ...old, pages: newPages };
        });
      }
    };

    onNewFollower(handleNewFollower);
    onRemoveFollower(handleRemoveFollower);
    return () => {
      offNewFollower(handleNewFollower);
      offRemoveFollower(handleRemoveFollower);
    };
  }, []);
};

export default useNewFollowerToggle;
