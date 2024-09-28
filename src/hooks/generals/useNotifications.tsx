import { offNewNotification, onNewNotification } from "@/lib/socketIO";
import { useEffect } from "react";

const useNotifications = () => {
  useEffect(() => {
    const handleNewNotification = (obj) => {
      console.log("new notifications", obj);
    };

    onNewNotification(handleNewNotification);

    return () => {
      offNewNotification(handleNewNotification);
    };
  }, []);

  return;
};

export default useNotifications;
