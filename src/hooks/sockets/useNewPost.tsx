import { POST, REPLY } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import useLoginCheck from "../auth/useLoginCheck";
import getGraphql from "@/utils/api/graphql";
import isCurrentUserFollowSchema, {
  isCurrentUserFollowDataQuery,
} from "@/graphql/followers/isCurrentUserFollowSchema";

type OLD = {
  pages: POST[][];
};

const useNewPost = (socket: Socket) => {
  const queryClient = useQueryClient();
  const { data: actualUser } = useLoginCheck();

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = async (data: REPLY) => {
      try {
        const newPost = data;
        console.log("newPost", newPost);

        const isAddToFollowingPost =
          newPost.user._id === actualUser._id ||
          (await getGraphql(
            isCurrentUserFollowSchema,
            isCurrentUserFollowDataQuery,
            { userId: newPost.user._id }
          ));

        const checkStatus = queryClient.getQueryState(["following posts"]);

        if (checkStatus?.status === "success" && isAddToFollowingPost) {
          queryClient.setQueryData(["following posts"], (old: OLD) => {
            const modifyPages = old.pages.map((page) => [...page]);

            modifyPages[0] = [newPost, ...modifyPages[0]];

            return { ...old, pages: modifyPages };
          });
        }

        if (newPost.user._id === actualUser._id) {
          const checkStatus = queryClient.getQueryState([
            "user posts",
            actualUser._id,
          ]);

          if (checkStatus?.status === "success") {
            queryClient.setQueryData(
              ["user posts", actualUser._id],
              (old: OLD) => {
                const modifyPages = old.pages.map((page) => [...page]);

                modifyPages[0] = [newPost, ...modifyPages[0]];

                return { ...old, pages: modifyPages };
              }
            );
          }
        }
      } catch (error) {
        console.error("error in add new post", error);
      }
    };

    socket.on("new-post", handleNewPost);

    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, [socket, queryClient]);
};

export default useNewPost;
