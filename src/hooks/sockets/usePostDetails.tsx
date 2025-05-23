import { POST_DETAIL } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const usePostDetails = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handlePostDetails = (data: POST_DETAIL) => {
      const updatePost = data;

      const checkStatus = queryClient.getQueryState([
        "post details",
        updatePost.post,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["post details", updatePost.post],
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
