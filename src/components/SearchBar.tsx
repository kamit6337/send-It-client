import ReactIcons from "@/assets/icons";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="px-5">
      <div className="bg-search_bg flex items-center rounded-full p-3 border border-transparent focus-within:border-sky_blue">
        <p>
          <ReactIcons.search
            className={`${isFocused && "text-sky_blue"} text-xl`}
          />
        </p>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-search_bg text-sm outline-none w-full px-2"
        />
        {search && (
          <p className="cursor-pointer" onClick={() => setSearch("")}>
            <ReactIcons.cancel className="text-xl text-sky_blue" />
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
