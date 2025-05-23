import { NOTIFICATION } from "@/types";
import { useNavigate } from "react-router-dom";
import UpperPortion from "./UpperPortion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useUpdateNotification from "@/hooks/notification/useUpdateNotification";

type Props = {
  notification: NOTIFICATION;
};

const SingleNotification = ({ notification }: Props) => {
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { _id: notificationID, post, type } = notification;

  const { mutate } = useUpdateNotification(notificationID);

  useEffect(() => {
    if (inView && notificationID) {
      mutate(notificationID);
    }
  }, [inView, notificationID]);

  if ((type === "like" || type === "reply") && post) {
    const { _id: postId, message: postMessage, media } = post;

    return (
      <div
        ref={ref}
        className="border-b py-2 px-5 space-y-5 hover:bg-gray-50 cursor-pointer"
        onClick={() => navigate(`/posts/${postId}`)}
      >
        <UpperPortion notification={notification} />
        {postMessage && !media && (
          <div className="text-blue-500 ml-[60px]">{postMessage}</div>
        )}
        {media && (
          <div className="w-40 ml-[60px]">
            <img
              src={media}
              alt={postMessage}
              className="w-full object-cover rounded"
            />
          </div>
        )}
      </div>
    );
  }

  return;
};

export default SingleNotification;
