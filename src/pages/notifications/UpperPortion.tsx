import { NOTIFICATION } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
  notification: NOTIFICATION;
};

const UpperPortion = ({ notification }: Props) => {
  const navigate = useNavigate();

  const { sender, message } = notification;

  return (
    <div className="flex items-center gap-5">
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

export default UpperPortion;
