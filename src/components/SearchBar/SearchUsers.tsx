import ReactIcons from "@/assets/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import useUserSearch from "@/hooks/user/useUserSearch";
import useDebounce from "@/hooks/general/useDebounce";
import { USER } from "@/types";

const SearchUsers = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input);
  const { data: searchedUsers = [] } = useUserSearch(debounceInput);

  const handleChange = (value: string) => {
    setInput(value);
    setShowCancel(!!value);
  };

  const handleCancel = () => {
    setInput("");
    setShowCancel(false);
    setIsFocused(false);
  };

  return (
    <div className="relative ">
      <div className={`flex items-center px-3 input_div`}>
        <p>
          <ReactIcons.search
            className={`${isFocused && "text-sky_blue"} text-xl`}
          />
        </p>
        <input
          value={input}
          placeholder="Search"
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          spellCheck="false"
          className="bg-inherit text-sm w-full px-2 py-3 h-full outline-none rounded-full"
        />
        {showCancel && (
          <p className="cursor-pointer" onClick={handleCancel}>
            <ReactIcons.cancel className="text-xl text-sky_blue" />
          </p>
        )}
      </div>

      <div className="absolute z-10 bg-background w-full shadow-md shadow-gray-500 rounded-md max-h-96 overflow-y-auto">
        {searchedUsers.length > 0 &&
          searchedUsers.map((obj: USER) => {
            const { _id, name, email, photo } = obj;

            return (
              <Link
                to={`/${email}`}
                key={_id}
                className="p-3 flex gap-3 w-full hover:bg-sidebar_link_hover border-b border-div_border"
                onClick={handleCancel}
              >
                <div className="w-10">
                  <img src={photo} alt={name} className="rounded-full w-full" />
                </div>
                <div>
                  <p>{name}</p>
                  <p className="username">{email}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchUsers;
