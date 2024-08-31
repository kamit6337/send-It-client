import Toastify from "@/lib/Toastify";
import { PostDetails } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostLikeToggle = (postId: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["toggle post like", postId],
    mutationFn: ({ toggle }: { toggle: boolean }) => {
      if (toggle) {
        return postReq("/like", { id: postId });
      } else {
        return deleteReq("/like", { id: postId });
      }
    },
    onMutate: async ({ toggle, post }) => {
      // Cancel any ongoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["post details", postId],
        exact: true,
      });

      // Snapshot the previous data for potential rollback (create a deep copy)
      const previousPostDetailsData = JSON.parse(
        JSON.stringify(queryClient.getQueryData(["post details", postId]))
      );

      const previousUserLikedPostsData = JSON.parse(
        JSON.stringify(queryClient.getQueryData(["user liked posts"]) || [])
      );

      // Optimistically add the new todo to the cache with the temporary postId
      queryClient.setQueryData(["post details", postId], (old: PostDetails) => {
        if (toggle) {
          old.data.isLiked = true;
        } else {
          old.data.isLiked = false;
        }

        return old;
      });

      const checkState = queryClient.getQueryState(["user liked posts"]);

      if (checkState) {
        if (toggle) {
          queryClient.setQueryData(["user liked posts"], (old) => {
            const newPages = [...old.pages];
            newPages[0] = [post, ...newPages[0]];
            return { ...old, pages: newPages };
          });
        } else {
          queryClient.setQueryData(["user liked posts"], (old) => {
            const removeLikePost = old.pages.map((page) => {
              return page.filter((obj) => obj._id !== post._id);
            });
            return { ...old, pages: removeLikePost };
          });
        }
      }

      // Return context with previous data and tempId for rollback and replacement
      return { previousPostDetailsData, previousUserLikedPostsData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["post details", postId],
        context?.previousPostDetailsData
      );

      queryClient.setQueryData(
        ["user liked posts"],
        context?.previousUserLikedPostsData
      );

      showErrorMessage({
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    },
  });

  return mutation;
};

export default usePostLikeToggle;
