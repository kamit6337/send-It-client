import updatePostLikeSchema, {
  updatePostLikeDataQuery,
} from "@/graphql/like_and_save/updatePostLikeSchema";
import Toastify from "@/lib/Toastify";
import { POST, POST_DETAIL, USER_PROFILE } from "@/types";
import getGraphql from "@/utils/api/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLoginCheck from "../auth/useLoginCheck";

type DATA = {
  bool: "true" | "false";
  count: number;
};

type OLD = {
  pages: POST[][];
};

const useTogglePostLike = (post: POST) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();
  const { data: actualUser } = useLoginCheck();

  const mutation = useMutation({
    mutationKey: ["update post like", post._id],
    mutationFn: (toggle: boolean) =>
      getGraphql(updatePostLikeSchema, updatePostLikeDataQuery, {
        toggle,
        id: post._id,
      }),
    onSuccess(data) {
      const result = data as DATA;

      const checkStatus = queryClient.getQueryState(["post details", post._id]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["post details", post._id],
          (old: POST_DETAIL) => {
            if (result.bool === "true") {
              return { ...old, isLiked: true };
            }

            if (result.bool === "false") {
              return { ...old, isLiked: false };
            }
            return old;
          }
        );
      }

      const checkLikePostStatus = queryClient.getQueryState([
        "user like posts",
      ]);

      if (checkLikePostStatus?.status === "success") {
        queryClient.setQueryData(["user like posts"], (old: OLD) => {
          if (result.bool === "true") {
            const modifyPages = old.pages.map((page) => [...page]);

            modifyPages[0] = [post, ...modifyPages[0]];
            return { ...old, pages: modifyPages };
          }

          if (result.bool === "false") {
            const modifyPages = old.pages.map((page) =>
              page.filter((prevPost) => prevPost._id !== post._id)
            );

            return { ...old, pages: modifyPages };
          }

          return old;
        });
      }

      const checkUserProfileStatus = queryClient.getQueryState([
        "user profile",
        actualUser.email,
      ]);

      if (checkUserProfileStatus?.status === "success") {
        queryClient.setQueryData(
          ["user profile", actualUser.email],
          (old: USER_PROFILE) => {
            return { ...old, likePosts: result.count };
          }
        );
      }
    },
    onError(error) {
      showErrorMessage({
        message: error.message,
      });
    },
  });

  return mutation;
};

export default useTogglePostLike;
