import ReactIcons from "@/assets/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  isUserLayout?: boolean;
  info?: () => string;
};

const LeftArrowBtn = ({ title, isUserLayout = false, info }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
      <button className="left_arrow" onClick={() => navigate(-1)}>
        <ReactIcons.leftArrow className="text-xl" />
      </button>
      {isUserLayout ? (
        <div>
          <p className="font-semibold tracking-wider">{title}</p>
          <p className="text-grey text-sm">{info ? info() : ""}</p>
        </div>
      ) : (
        <p className="text-xl font-semibold tracking-wider">{title}</p>
      )}
    </div>
  );
};

export default LeftArrowBtn;
