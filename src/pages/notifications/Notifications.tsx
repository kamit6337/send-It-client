import useUserNotification from "@/hooks/notification/useUserNotification";
import Loading from "@/lib/Loading";
import { NOTIFICATION } from "@/types";
import SingleNotification from "./SingleNotification";
import LeftArrowBtn from "@/components/LeftArrowBtn";

const Notifications = () => {
  const { isLoading, error, data } = useUserNotification();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const notifications = data?.pages.flatMap((page) => page) as NOTIFICATION[];

  return (
    <div className="w-full">
      <div>
        <LeftArrowBtn title="Notification" />
      </div>
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            return (
              <SingleNotification
                notification={notification}
                key={notification._id}
              />
            );
          })
        ) : (
          <div className="h-96 flex justify-center items-center capitalize ">
            No notification so far
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
