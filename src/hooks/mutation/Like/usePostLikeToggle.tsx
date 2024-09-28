import Toastify from "@/lib/Toastify";
import { PostDetails } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostLikeToggle = (actualUser, postId: string, user) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["toggle post like", postId],
    mutationFn: ({ toggle }: { toggle: boolean }) => {
      if (toggle) {
        return postReq("/like", { id: postId, user });
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

      const previousUserProfileData = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", actualUser.username]) || []
        )
      );

      // Optimistically add the new todo to the cache with the temporary postId
      queryClient.setQueryData(["post details", postId], (old: PostDetails) => {
        if (toggle) {
          old.isLiked = true;
        } else {
          old.isLiked = false;
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

      const userProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (userProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          (old) => {
            if (toggle) {
              old.likePosts = old.likePosts + 1;
            } else {
              old.likePosts = old.likePosts - 1;
            }

            return { ...old };
          }
        );
      }

      // Return context with previous data and tempId for rollback and replacement
      return {
        previousPostDetailsData,
        previousUserLikedPostsData,
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

      const checkState = queryClient.getQueryState(["user liked posts"]);

      if (checkState) {
        queryClient.setQueryData(
          ["user liked posts"],
          context?.previousUserLikedPostsData
        );
      }

      showErrorMessage({
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    },
  });

  return mutation;
};

export default usePostLikeToggle;
