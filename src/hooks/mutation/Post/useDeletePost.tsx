import Toastify from "@/lib/Toastify";
import { User } from "@/types";
import { deleteReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePost = (actualUser: User, postId: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["delete post", postId],
    mutationFn: () => deleteReq("/post", { id: postId }),
    onMutate() {
      const previousUserProfile = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", actualUser.username]) || []
        )
      );

      const postDetails = queryClient.getQueryData(["post details", postId]);

      const userProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (userProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          (old) => {
            if (postDetails.isLiked) {
              old.likePosts = old.likePosts - 1;
            }

            if (postDetails.isSaved) {
              old.savePosts = old.savePosts - 1;
            }

            return { ...old };
          }
        );
      }

      return { previousUserProfile };
    },
    onError(error, variables, context) {
      const userProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (userProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          context?.previousUserProfile
        );
      }
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    },
  });

  return mutation;
};

export default useDeletePost;
