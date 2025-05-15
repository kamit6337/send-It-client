import { POST_DETAIL, SIMPLE_POST } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const usePostDetails = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handlePostDetails = (data: SIMPLE_POST) => {
      const updatePost = data;

      const checkStatus = queryClient.getQueryState([
        "post details",
        updatePost._id,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["post details", updatePost._id],
          (old: POST_DETAIL) => {
            return { ...old, ...updatePost };
          }
        );
      }
    };

    socket.on("update-post-details", handlePostDetails);

    return () => {
      socket.off("update-post-details", handlePostDetails);
    };
  }, [socket, queryClient]);
};

export default usePostDetails;
