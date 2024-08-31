import Toastify from "@/lib/Toastify";
import { updateFollowing } from "@/redux/slice/followingSlice";
import { postReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useNewFollowing = (actualUser, _id) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["new following", _id],
    mutationFn: ({ id, username }) => postReq("/following", { id, username }),
    onMutate: async ({ userObj }) => {
      console.log("run new following once");

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
        isActualUserFollow: true,
      };

      dispatch(updateFollowing(obj));

      const checkUserFollowingState = queryClient.getQueryState([
        "user following",
        actualUser._id,
      ]);

      if (checkUserFollowingState) {
        queryClient.setQueryData(["user following", actualUser._id], (old) => {
          const newPages = [...old.pages];
          newPages[0] = [obj, ...newPages[0]];
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
            return { ...old, followingCount: old.followingCount + 1 };
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
        isActualUserFollow: false,
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

export default useNewFollowing;
