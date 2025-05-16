import { USER, USER_PROFILE } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useUpdateUserBio = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleUpdateUserBio = (data: USER) => {
      const updatedUser = data;

      const checkStatus = queryClient.getQueryState([
        "user profile",
        updatedUser.email,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["user profile", updatedUser.email],
          (old: USER_PROFILE) => {
            return { ...old, ...updatedUser };
          }
        );
      }
    };

    socket.on("update-user-bio", handleUpdateUserBio);

    return () => {
      socket.off("update-user-bio", handleUpdateUserBio);
    };
  }, [socket, queryClient]);
};

export default useUpdateUserBio;
