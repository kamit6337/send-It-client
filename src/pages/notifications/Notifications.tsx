import useUserNotification from "@/hooks/notification/useUserNotification";
import Loading from "@/lib/Loading";
import { NOTIFICATION } from "@/types";
import SingleNotification from "./SingleNotification";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import debounce from "@/utils/javascript/debounce";
import getGraphql from "@/utils/api/graphql";
import updateNotificationListSchema, {
  updateNotificationListDataQuery,
} from "@/graphql/notification/updateNotificationListSchema";
import { useQueryClient } from "@tanstack/react-query";

type OLD_NOTIFICATION = {
  pages: NOTIFICATION[][];
};

const Notifications = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useUserNotification();

  const seenNotificationIds = useRef(new Set<string>());
  const unSeenNotificationIds = useRef(new Set<string>());

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const makeUnseenSeen = useCallback(
    debounce(async () => {
      try {
        if (unSeenNotificationIds.current.size === 0) return;

        const allNotificationIds = Array.from(unSeenNotificationIds.current);

        await getGraphql(
          updateNotificationListSchema,
          updateNotificationListDataQuery,
          { ids: allNotificationIds }
        );

        const checkStatus = queryClient.getQueryState(["notification count"]);

        if (checkStatus?.status === "success") {
          queryClient.setQueryData(["notification count"], (old: number) => {
            return old - allNotificationIds.length < 0
              ? 0
              : old - allNotificationIds.length;
          });
        }

        const checkNotificationStatus = queryClient.getQueryState([
          "user notification",
        ]);

        if (checkNotificationStatus?.status === "success") {
          queryClient.setQueryData(
            ["user notification"],
            (old: OLD_NOTIFICATION) => {
              const modifyNotifications = old.pages.map((page) =>
                page.map((notification) => {
                  if (allNotificationIds.includes(notification._id)) {
                    return { ...notification, isRead: true };
                  }

                  return notification;
                })
              );
              return { ...old, pages: modifyNotifications };
            }
          );
        }

        unSeenNotificationIds.current.clear();
      } catch (error) {
        console.error("error from notification", error);
      }
    }, 1000),
    []
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleSeenNotification = (id: string) => {
    if (!seenNotificationIds.current.has(id)) {
      seenNotificationIds.current.add(id);
      unSeenNotificationIds.current.add(id);
      makeUnseenSeen();
    }
  };

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
                  isVisible={handleSeenNotification}
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
