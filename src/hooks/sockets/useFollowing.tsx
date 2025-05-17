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
  followingUser: USER;
  followingCount: number;
};

type OLD = {
  pages: USER[][];
};

const useFollowing = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewFollowing = async (data: DATA) => {
      try {
        console.log("new following", data);

        const { user, followingUser, followingCount: newFollowingCount } = data;

        const checkStatus = queryClient.getQueryState([
          "user profile",
          user.email,
        ]);

        if (checkStatus?.status === "success") {
          queryClient.setQueryData(
            ["user profile", user.email],
            (old: USER_PROFILE) => {
              return { ...old, followingCount: newFollowingCount };
            }
          );
        }

        const checkFollowingStatus = queryClient.getQueryState([
          "user followings",
          user._id,
        ]);

        if (checkFollowingStatus) {
          const whetherIsFollowed = await getGraphql(
            isCurrentUserFollowSchema,
            isCurrentUserFollowDataQuery,
            { userId: followingUser._id }
          );

          console.log("whetherIsFollowed", "use Following", whetherIsFollowed);

          const obj = {
            ...followingUser,
            isFollowed: whetherIsFollowed,
          };

          queryClient.setQueryData(
            ["user followings", user._id],
            (old: OLD) => {
              const modifyPages = old.pages.map((page) => [...page]);

              modifyPages[0] = [obj, ...modifyPages[0]];

              return { ...old, pages: modifyPages };
            }
          );
        }
      } catch (error) {
        console.error("error in add new following", error);
      }
    };

    const handleRemoveFollowing = (data: DATA) => {
      console.log("remove following", data);

      const { user, followingUser, followingCount: newFollowingCount } = data;

      const checkStatus = queryClient.getQueryState([
        "user profile",
        user.email,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["user profile", user.email],
          (old: USER_PROFILE) => {
            return { ...old, followingCount: newFollowingCount };
          }
        );
      }

      const checkFollowingStatus = queryClient.getQueryState([
        "user followings",
        user._id,
      ]);

      if (checkFollowingStatus) {
        queryClient.setQueryData(["user followings", user._id], (old: OLD) => {
          const modifyPages = old.pages.map((page) =>
            page.filter((user) => user._id !== followingUser._id)
          );

          return { ...old, pages: modifyPages };
        });
      }
    };

    socket.on("add-following", handleNewFollowing);
    socket.on("remove-following", handleRemoveFollowing);

    return () => {
      socket.off("add-following", handleNewFollowing);
      socket.off("remove-following", handleRemoveFollowing);
    };
  }, [socket, queryClient]);
};

export default useFollowing;
