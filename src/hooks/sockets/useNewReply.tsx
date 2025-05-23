import { POST } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type OLD = {
  pages: POST[][];
};

const useNewReply = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewReply = (data: POST) => {
      const newReply = data;

      console.log("newReply", newReply);

      const checkStatus = queryClient.getQueryState([
        "reply posts",
        newReply.replyPost,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["reply posts", newReply.replyPost],
          (old: OLD) => {
            const modifyPages = old.pages.map((page) => [...page]);
            modifyPages[0] = [newReply, ...modifyPages[0]];
            return { ...old, pages: modifyPages };
          }
        );
      }
    };

    socket.on("new-reply", handleNewReply);

    return () => {
      socket.off("new-reply", handleNewReply);
    };
  }, [socket, queryClient]);
};

export default useNewReply;
