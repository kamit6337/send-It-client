import SearchBar from "@/containers/searchBar/SearchBar";
import { OutletContext } from "@/types";
import { Outlet, useOutletContext } from "react-router-dom";

const SearchBarLayout = () => {
  const { actualUser } = useOutletContext<OutletContext>();

  return (
    <div className="w-full flex items-start">
      <div className="flex-1">
        <Outlet context={{ actualUser }} />
      </div>
      <div className="hidden lg:block sticky top-0 py-2 lg:w-96 h-screen border-l border-div_border">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchBarLayout;
