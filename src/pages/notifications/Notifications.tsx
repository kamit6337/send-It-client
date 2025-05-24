import useUserNotification from "@/hooks/notification/useUserNotification";
import Loading from "@/lib/Loading";
import { NOTIFICATION } from "@/types";
import SingleNotification from "./SingleNotification";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Notifications = () => {
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserNotification();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const notifications = data?.pages.flatMap((page) => page) as NOTIFICATION[];

  return (
    <>
      <Helmet>
        <title>Notifications</title>
        <meta
          name="notifications"
          content="Notifications page of this project"
        />
      </Helmet>
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
        <div
          ref={hasNextPage && !isFetchingNextPage ? ref : null}
          className="h-96"
        />
        {isFetchingNextPage && <div>Loading ...</div>}
      </div>
    </>
  );
};

export default Notifications;
