import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Notifications;
