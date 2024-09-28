import Toastify from "@/lib/Toastify";
import { patchReq } from "@/utils/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUserProfile = (user) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["user profile update"],
    mutationFn: (body) => patchReq("/user", body),
    onMutate(body) {
      const previousUserProfile = JSON.parse(
        JSON.stringify(
          queryClient.getQueryData(["user profile", user.username])
        )
      );

      const checkState = queryClient.getQueryState([
        "user profile",
        user.username,
      ]);

      if (checkState) {
        queryClient.setQueryData(["user profile", user.username], (old) => {
          return body;
        });
      }

      return { previousUserProfile };
    },
    onError(error, variables, context) {
      const checkState = queryClient.getQueryState([
        "user profile",
        user.username,
      ]);

      if (checkState) {
        queryClient.setQueryData(
          ["user profile", user.username],
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

export default useUpdateUserProfile;
