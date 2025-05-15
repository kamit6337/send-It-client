import { Outlet } from "react-router-dom";

const SearchBarLayout = () => {
  return (
    <div className="w-full flex items-start">
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="hidden lg:block sticky top-0 py-2 lg:w-96 h-screen border-l border-div_border">
        SearchBar
      </div>
    </div>
  );
};

export default SearchBarLayout;
