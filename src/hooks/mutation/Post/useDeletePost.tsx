import Toastify from "@/lib/Toastify";
import { deleteReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeletePost = (actualUser, postId) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["delete post", postId],
    mutationFn: () => deleteReq("/post", { id: postId }),
    onMutate(variables) {
      const previousUserProfile = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", actualUser.username])
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
            old.userPosts = old.userPosts - 1;

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
