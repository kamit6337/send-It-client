import Toastify from "@/lib/Toastify";
import { updateFollowing } from "@/redux/slice/followingSlice";
import { deleteReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useRemoveFollower = (actualUser, _id) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["remove following", _id],
    mutationFn: ({ id, username }) => deleteReq("/following", { id, username }),
    onMutate: async ({ userObj }) => {
      await queryClient.cancelQueries({
        queryKey: ["user following", actualUser._id],
      });

      const previousUserFollowingData = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user following", actualUser._id]) || []
        )
      );

      const previousUserProfile = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", actualUser.username]) || []
        )
      );

      const obj = {
        _id: userObj._id,
        user: userObj,
        isActualUserFollow: false,
      };

      dispatch(updateFollowing(obj));

      const checkUserFollowingState = queryClient.getQueryState([
        "user following",
        actualUser._id,
      ]);

      if (checkUserFollowingState) {
        queryClient.setQueryData(["user following", actualUser._id], (old) => {
          const newPages = old.pages.map((page) => {
            return page.filter((obj) => obj.user._id !== userObj._id);
          });
          return { ...old, pages: newPages };
        });
      }

      const checkUserProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (checkUserProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          (old) => {
            return { ...old, followingCount: old.followingCount - 1 };
          }
        );
      }

      return { previousUserFollowingData, previousUserProfile };
    },
    onError(error, variables, context) {
      const { userObj } = variables;

      const obj = {
        _id: userObj._id,
        user: userObj,
        isActualUserFollow: true,
      };

      dispatch(updateFollowing(obj));

      const checkUserFollowingState = queryClient.getQueryState([
        "user following",
        actualUser._id,
      ]);

      if (checkUserFollowingState) {
        queryClient.setQueryData(
          ["user following", actualUser._id],
          context?.previousUserFollowingData
        );
      }

      const checkUserProfileState = queryClient.getQueryState([
        "user profile",
        actualUser.username,
      ]);

      if (checkUserProfileState) {
        queryClient.setQueryData(
          ["user profile", actualUser.username],
          context?.previousUserProfile
        );
      }

      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    },
  });

  return mutation;
};

export default useRemoveFollower;
