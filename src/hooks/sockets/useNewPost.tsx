import { POST } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type OLD = {
  pages: POST[][];
};

const useNewPost = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (data: POST) => {
      const newPost = data;

      console.log("newPost", newPost);

      const checkStatus = queryClient.getQueryState(["following posts"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["following posts"], (old: OLD) => {
          const modifyPages = old.pages.map((page) => [...page]);

          modifyPages[0] = [newPost, ...modifyPages[0]];

          return { ...old, pages: modifyPages };
        });
      }
    };

    socket.on("new-post", handleNewPost);

    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, [socket, queryClient]);
};

export default useNewPost;
