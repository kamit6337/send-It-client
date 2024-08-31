import {
  offNewLike,
  offNewSave,
  offRemoveLike,
  offRemoveSave,
  onNewLike,
  onNewSave,
  onRemoveLike,
  onRemoveSave,
} from "@/lib/socketIO";
import { Like, PostDetails, Save } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useLikeAndCommentSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewLike = (response: Like) => {
      const checkStatus = queryClient.getQueryState([
        "post details",
        response.post,
      ]);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", response.post],
          (old: PostDetails) => {
            old.data.likeCount = old.data.likeCount + 1;
            return old;
          }
        );
      }
    };

    const handleRemoveLike = (response: Like) => {
      const checkStatus = queryClient.getQueryState([
        "post details",
        response.post,
      ]);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", response.post],
          (old: PostDetails) => {
            old.data.likeCount = old.data.likeCount - 1;
            return old;
          }
        );
      }
    };

    const handleNewSave = (response: Save) => {
      const checkStatus = queryClient.getQueryState([
        "post details",
        response.post,
      ]);

      console.log("response add", response);
      console.log("response add checkStatus", checkStatus);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", response.post],
          (old: PostDetails) => {
            old.data.saveCount = old.data.saveCount + 1;
            return old;
          }
        );
      }
    };

    const handleRemoveSave = (response: Save) => {
      const checkStatus = queryClient.getQueryState([
        "post details",
        response.post,
      ]);
      console.log("response remove", response);
      console.log("response remove checkStatus", checkStatus);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", response.post],
          (old: PostDetails) => {
            old.data.saveCount = old.data.saveCount - 1;
            return old;
          }
        );
      }
    };

    onNewLike(handleNewLike);
    onRemoveLike(handleRemoveLike);
    onNewSave(handleNewSave);
    onRemoveSave(handleRemoveSave);
    return () => {
      offNewLike(handleNewLike);
      offRemoveLike(handleRemoveLike);
      offNewSave(handleNewSave);
      offRemoveSave(handleRemoveSave);
    };
  }, [queryClient]);

  return;
};

export default useLikeAndCommentSocket;
