import { ModeToggle } from "./ModeToggle";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="section_padding h-full flex justify-between items-center">
      <p>Company</p>
      <div className="flex items-center gap-5">
        <Profile />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
