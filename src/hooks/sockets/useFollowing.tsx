import { USER, USER_PROFILE } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type DATA = {
  user: USER;
  followingUser: USER;
  followingCount: number;
};

const useFollowing = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewFollowing = (data: DATA) => {
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
