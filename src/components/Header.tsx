import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className="section_padding h-full flex justify-between items-center">
      <p>Company</p>
      <div className="flex items-center gap-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
