import { NOTIFICATION } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
  notification: NOTIFICATION;
};

const SingleNotification = ({ notification }: Props) => {
  const navigate = useNavigate();

  const { sender, isRead, post, message, type } = notification;

  return (
    <div
      className="border-b py-2 px-5 space-y-2 hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        if (type === "like" || type === "reply") {
          navigate(`/posts/${post}`);
        }
      }}
    >
      <div>
        {sender.map((user) => {
          return (
            <div
              key={user._id}
              className="w-10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${user.email}`);
              }}
            >
              <img
                src={user.photo}
                alt={user.name}
                className="w-full object-cover rounded-full"
              />
            </div>
          );
        })}
      </div>
      <div>{message}</div>
    </div>
  );
};

export default SingleNotification;
