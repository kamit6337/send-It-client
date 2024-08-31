import {
  offNewReply,
  offUpdateReply,
  onNewReply,
  onUpdateReply,
} from "@/lib/socketIO";
import { Reply } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNewReplyPost = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewReply = (obj: Reply) => {
      const checkStatus = queryClient.getQueryState(["post replies", obj.post]);

      if (checkStatus) {
        queryClient.setQueryData(["post replies", obj.post], (old) => {
          if (!old || !old.pages) return old; // Ensure old and old.pages are defined
          const newPages = [...old.pages];
          newPages[0] = [obj, ...newPages[0]];
          return { ...old, pages: newPages };
        });
      }
    };

    const handleUpdateReply = (obj: Reply) => {
      const { post, replyPost: updatedReplyPost } = obj;

      const checkState = queryClient.getQueryState(["post replies", post]);
      if (checkState) {
        queryClient.setQueryData(["post replies", post], (old: any) => {
          if (!old || !old.pages) return old; // Ensure old and old.pages are defined

          const updatedNewPages = old.pages.map((page) => {
            return page.map((reply: Reply) => {
              // const { replyPost, post, _id } = reply;

              if (reply.replyPost._id === updatedReplyPost._id) {
                return { ...reply, replyPost: updatedReplyPost };
              }
              return reply;
            });
          });

          return { ...old, pages: updatedNewPages };
        });
      }

      const checkReplyPost = queryClient.getQueryState([
        "post reply",
        updatedReplyPost._id,
      ]);

      if (checkReplyPost) {
        queryClient.setQueryData(
          ["post reply", updatedReplyPost._id],
          (old) => {
            return { ...old, replyPost: updatedReplyPost };
          }
        );
      }
    };

    onNewReply(handleNewReply);
    onUpdateReply(handleUpdateReply);
    return () => {
      offNewReply(handleNewReply);
      offUpdateReply(handleUpdateReply);
    };
  }, []);
};

export default useNewReplyPost;
