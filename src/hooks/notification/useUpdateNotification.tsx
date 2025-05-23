import { useMutation, useQueryClient } from "@tanstack/react-query";
import getGraphql from "@/utils/api/graphql";
import updateNotificationListSchema, {
  updateNotificationListDataQuery,
} from "@/graphql/notification/updateNotificationListSchema";
import Toastify from "@/lib/Toastify";

const useUpdateNotification = (id: string) => {
  const queryClient = useQueryClient();
  const { showErrorMessage } = Toastify();

  const mutation = useMutation({
    mutationKey: ["update notifications", id],
    mutationFn: (notificationID: string) =>
      getGraphql(
        updateNotificationListSchema,
        updateNotificationListDataQuery,
        { ids: [notificationID] }
      ),
    onSuccess(data) {
      const notificationCount = data;

      const checkStatus = queryClient.getQueryState(["notification count"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["notification count"], () => {
          return notificationCount;
        });
      }
    },
    onError(error) {
      showErrorMessage({ message: error.message });
    },
  });

  return mutation;
};

export default useUpdateNotification;
