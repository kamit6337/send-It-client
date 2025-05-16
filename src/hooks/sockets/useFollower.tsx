import { USER, USER_PROFILE } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type DATA = {
  user: USER;
  followerUser: USER;
  followerCount: number;
};

const useFollower = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewFollower = (data: DATA) => {
      console.log("new follower", data);

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
    };

    const handleRemoveFollower = (data: DATA) => {
      console.log("remove follower", data);

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
