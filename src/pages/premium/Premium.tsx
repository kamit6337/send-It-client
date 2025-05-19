import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Premium;
