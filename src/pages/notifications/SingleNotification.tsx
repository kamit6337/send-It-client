import { NOTIFICATION } from "@/types";
import { useNavigate } from "react-router-dom";
import UpperPortion from "./UpperPortion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

type Props = {
  notification: NOTIFICATION;
  isVisible: (value: string) => void;
};

const SingleNotification = ({ notification, isVisible }: Props) => {
  const navigate = useNavigate();
  const { data: actualUser } = useLoginCheck();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { _id: notificationID, post, type, isRead } = notification;

  useEffect(() => {
    if (inView && notificationID && !isRead) {
      isVisible(notificationID);
    }
  }, [inView, notificationID]);

  if ((type === "like" || type === "reply") && post) {
    const { _id: postId, message: postMessage, media } = post;

    return (
      <div
        ref={ref}
        className="border-b py-2 px-5 space-y-5 hover:bg-post_hover_bg cursor-pointer"
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

  if (type === "follower") {
    return (
      <div
        ref={ref}
        className="border-b py-2 px-5 space-y-5 hover:bg-post_hover_bg cursor-pointer"
        onClick={() => navigate(`/${actualUser.email}/follower`)}
      >
        <UpperPortion notification={notification} />
      </div>
    );
  }

  return;
};

export default SingleNotification;
