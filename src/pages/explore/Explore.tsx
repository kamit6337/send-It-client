import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Explore;
