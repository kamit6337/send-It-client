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

const useLikeAndCommentSocket = (postId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewLike = (response: Like) => {
      if (postId === response.post) {
        queryClient.setQueryData(
          ["post details", postId],
          (old: PostDetails) => {
            old.data.likeCount = old.data.likeCount + 1;
            return old;
          }
        );
      }
    };

    const handleRemoveLike = (response: Like) => {
      if (postId === response.post) {
        queryClient.setQueryData(
          ["post details", postId],
          (old: PostDetails) => {
            old.data.likeCount = old.data.likeCount - 1;
            return old;
          }
        );
      }
    };

    const handleNewSave = (response: Save) => {
      if (postId === response.post) {
        queryClient.setQueryData(
          ["post details", postId],
          (old: PostDetails) => {
            old.data.saveCount = old.data.saveCount + 1;
            return old;
          }
        );
      }
    };

    const handleRemoveSave = (response: Save) => {
      if (postId === response.post) {
        queryClient.setQueryData(
          ["post details", postId],
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
  }, [postId, queryClient]);

  return;
};

export default useLikeAndCommentSocket;
