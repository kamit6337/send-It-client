import isCurrentUserFollowSchema, {
  isCurrentUserFollowDataQuery,
} from "@/graphql/followers/isCurrentUserFollowSchema";
import { USER, USER_PROFILE } from "@/types";
import getGraphql from "@/utils/api/graphql";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type DATA = {
  user: USER;
  followerUser: USER;
  followerCount: number;
};

type OLD = {
  pages: USER[][];
};

const useFollower = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewFollower = async (data: DATA) => {
      try {
        const { user, followerCount: newFollowerCount, followerUser } = data;

        const checkStatus = queryClient.getQueryState([
          "user profile",
          user.email,
        ]);

        if (checkStatus?.status === "success") {
          queryClient.setQueryData(
            ["user profile", user.email],
            (old: USER_PROFILE) => {
              return { ...old, followersCount: newFollowerCount };
            }
          );
        }

        const checkFollowingStatus = queryClient.getQueryState([
          "user followers",
          user._id,
        ]);

        if (checkFollowingStatus) {
          const whetherIsFollowed = await getGraphql(
            isCurrentUserFollowSchema,
            isCurrentUserFollowDataQuery,
            { userId: followerUser._id }
          );

          const obj = {
            ...followerUser,
            isFollowed: whetherIsFollowed,
          };

          queryClient.setQueryData(["user followers", user._id], (old: OLD) => {
            const modifyPages = old.pages.map((page) => [...page]);

            modifyPages[0] = [obj, ...modifyPages[0]];
            return { ...old, pages: modifyPages };
          });
        }
      } catch (error) {
        console.error("error in add new following", error);
      }
    };

    const handleRemoveFollower = (data: DATA) => {
      const { user, followerCount: newFollowerCount, followerUser } = data;

      const checkStatus = queryClient.getQueryState([
        "user profile",
        user.email,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["user profile", user.email],
          (old: USER_PROFILE) => {
            return { ...old, followersCount: newFollowerCount };
          }
        );
      }

      const checkFollowingStatus = queryClient.getQueryState([
        "user followers",
        user._id,
      ]);

      if (checkFollowingStatus) {
        queryClient.setQueryData(["user followers", user._id], (old: OLD) => {
          const modifyPages = old.pages.map((page) =>
            page.filter((user) => user._id !== followerUser._id)
          );

          return { ...old, pages: modifyPages };
        });
      }
    };

    socket.on("add-follower", handleNewFollower);
    socket.on("remove-follower", handleRemoveFollower);

    return () => {
      socket.off("add-follower", handleNewFollower);
      socket.off("remove-follower", handleRemoveFollower);
    };
  }, [queryClient, socket]);
};

export default useFollower;
