import Toastify from "@/lib/Toastify";
import { PostDetail, User } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostSaveToggle = (actualUser: User, postId: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["toggle post save", postId],
    mutationFn: ({ toggle }: { toggle: boolean }) => {
      if (toggle) {
        return postReq("/save", { id: postId });
      } else {
        return deleteReq("/save", { id: postId });
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

      const previousUserSavedPostsData = JSON.parse(
        JSON.stringify(queryClient.getQueryData(["user saved posts"]) || [])
      );

      const previousUserProfileData = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", actualUser.username]) || []
        )
      );

      // Optimistically add the new todo to the cache with the temporary postId
      queryClient.setQueryData(["post details", postId], (old: PostDetail) => {
        if (toggle) {
          old.isSaved = true;
        } else {
          old.isSaved = false;
        }

        return old;
      });

      const checkState = queryClient.getQueryState(["user saved posts"]);

      if (checkState) {
        if (toggle) {
          queryClient.setQueryData(["user saved posts"], (old) => {
            const newPages = [...old.pages];
            newPages[0] = [post, ...newPages[0]];
            return { ...old, pages: newPages };
          });
        } else {
          queryClient.setQueryData(["user saved posts"], (old) => {
            const removeLikePost = old.pages.map((page) => {
              return page.filter((obj) => obj._id !== post._id);
            });
            return { ...old, pages: removeLikePost };
          });
        }
      }

      const userProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (userProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          (old) => {
            if (toggle) {
              old.savePosts = old.savePosts + 1;
            } else {
              old.savePosts = old.savePosts - 1;
            }

            return { ...old };
          }
        );
      }

      // Return context with previous data and tempId for rollback and replacement
      return {
        previousPostDetailsData,
        previousUserSavedPostsData,
        previousUserProfileData,
      };
    },
    onError: (err, newTodo, context) => {
      const userProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (userProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          context?.previousUserProfileData
        );
      }

      queryClient.setQueryData(
        ["post details", postId],
        context?.previousPostDetailsData
      );

      const checkState = queryClient.getQueryState(["user saved posts"]);

      if (checkState) {
        queryClient.setQueryData(
          ["user saved posts"],
          context?.previousUserSavedPostsData
        );
      }

      showErrorMessage({
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    },
  });

  return mutation;
};

export default usePostSaveToggle;
