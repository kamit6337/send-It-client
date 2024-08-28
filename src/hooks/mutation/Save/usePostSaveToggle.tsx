import Toastify from "@/lib/Toastify";
import { PostDetails } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostSaveToggle = (postId: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["toggle post save", postId],
    mutationFn: (toggle: boolean) => {
      if (toggle) {
        return postReq("/save", { id: postId });
      } else {
        return deleteReq("/save", { id: postId });
      }
    },
    onMutate: async (toggle) => {
      // Cancel any ongoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["post details", postId],
        exact: true,
      });

      // Snapshot the previous data for potential rollback (create a deep copy)
      const previousData = JSON.parse(
        JSON.stringify(queryClient.getQueryData(["post details", postId]))
      );

      // Optimistically add the new todo to the cache with the temporary postId
      queryClient.setQueryData(["post details", postId], (old: PostDetails) => {
        if (toggle) {
          old.data.isSaved = true;
        } else {
          old.data.isSaved = false;
        }

        return old;
      });

      // Return context with previous data and tempId for rollback and replacement
      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["post details", postId], context?.previousData);

      showErrorMessage({
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    },
  });

  return mutation;
};

export default usePostSaveToggle;
