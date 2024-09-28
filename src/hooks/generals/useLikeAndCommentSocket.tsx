import {
  offNewLike,
  offNewSave,
  offNewView,
  offRemoveLike,
  offRemoveSave,
  onNewLike,
  onNewSave,
  onNewView,
  onRemoveLike,
  onRemoveSave,
} from "@/lib/socketIO";
import { Like, PostDetail, Save } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useLikeAndCommentSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewLike = (response: Like) => {
      console.log("new like response", response);

      const checkStatus = queryClient.getQueryState([
        "post details",
        response.post,
      ]);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", response.post],
          (old: PostDetails) => {
            old.likeCount = old.likeCount + 1;
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
          (old: PostDetail) => {
            old.likeCount = old.likeCount - 1;
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
          (old: PostDetail) => {
            old.saveCount = old.saveCount + 1;
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
          (old: PostDetail) => {
            old.saveCount = old.saveCount - 1;
            return old;
          }
        );
      }
    };

    const handleNewView = (obj) => {
      const checkStatus = queryClient.getQueryState([
        "post details",
        obj.postId,
      ]);

      if (checkStatus) {
        queryClient.setQueryData(
          ["post details", obj.postId],
          (old: PostDetail) => {
            old.viewCount = old.viewCount + 1;
            return old;
          }
        );
      }
    };

    onNewLike(handleNewLike);
    onRemoveLike(handleRemoveLike);
    onNewSave(handleNewSave);
    onRemoveSave(handleRemoveSave);
    onNewView(handleNewView);
    return () => {
      offNewLike(handleNewLike);
      offRemoveLike(handleRemoveLike);
      offNewSave(handleNewSave);
      offRemoveSave(handleRemoveSave);
      offNewView(handleNewView);
    };
  }, [queryClient]);

  return;
};

export default useLikeAndCommentSocket;
