import ReactIcons from "@/assets/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  handleClick?: () => void;
};

const LeftArrowBtn = ({ handleClick }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      className="left_arrow"
      onClick={() => (handleClick ? handleClick() : navigate(-1))}
    >
      <ReactIcons.leftArrow className="text-xl" />
    </button>
  );
};

export default LeftArrowBtn;
