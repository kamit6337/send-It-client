import { NOTIFICATION } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

type OLD = {
  pages: NOTIFICATION[][];
};

const useNotification = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data: NOTIFICATION) => {
      const checkStatus = queryClient.getQueryState(["user notification"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["user notification"], (old: OLD) => {
          const modifyPages = old.pages.map((page) => [...page]);
          modifyPages[0] = [data, ...modifyPages[0]];
          return { ...old, pages: modifyPages };
        });
      }
    };

    const handleNotificationCount = (data: number | string) => {
      const checkStatus = queryClient.getQueryState(["notification count"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["notification count"], () => {
          return data;
        });
      }
    };

    socket.on("notification", handleNewNotification);
    socket.on("notification-count", handleNotificationCount);

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("notification-count", handleNotificationCount);
    };
  }, [socket]);
};

export default useNotification;
