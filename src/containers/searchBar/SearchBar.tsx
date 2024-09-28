import ReactIcons from "@/assets/icons";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getReq } from "@/utils/api/api";
import debounce from "@/utils/javascript/debounce";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UserRooms from "./UserRooms";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import Room from "./Room";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const { showErrorMessage } = Toastify();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showMessageArea, setShowMessageArea] = useState(false);
  const { activeRoom } = useSelector(roomState);

  const { register, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });

  // Memoize the debounced function
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      try {
        const response = await getReq("/search", { search: value });
        setSearchedUsers(response);
      } catch (error) {
        showErrorMessage({
          message:
            error instanceof Error
              ? error?.message
              : "Something went wrong. Please try later",
        });
      }
    }, 500),
    []
  );

  const handleChange = (value) => {
    if (!value || value === "") {
      setShowCancel(false);
      setSearchedUsers([]);
      return;
    }

    setShowCancel(true);
    debouncedSearch(value);
  };

  const handleCancel = () => {
    reset();
    setShowCancel(false);
    setIsFocused(false);
    setSearchedUsers([]);
  };

  const handleCloseMessage = (bool) => {
    setShowMessageArea(bool);
  };

  return (
    <>
      <main className="flex flex-col">
        <div className="px-8">
          <div className="relative">
            <div className={`flex items-center p-[10px] input_div`}>
              <p>
                <ReactIcons.search
                  className={`${isFocused && "text-sky_blue"} text-xl`}
                />
              </p>
              <input
                {...register("search")}
                placeholder="Search"
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
                spellCheck="false"
                className="bg-inherit text-sm w-full px-2"
              />
              {showCancel && (
                <p className="cursor-pointer" onClick={handleCancel}>
                  <ReactIcons.cancel className="text-xl text-sky_blue" />
                </p>
              )}
            </div>

            <div className="absolute z-10 bg-background w-full shadow-md shadow-gray-500 rounded-md max-h-96 overflow-y-auto">
              {searchedUsers.length > 0 &&
                searchedUsers.map((obj) => {
                  const { _id, name, username, photo } = obj;

                  return (
                    <Link
                      to={`/${username}`}
                      key={_id}
                      className="p-3 flex gap-3 w-full hover:bg-sidebar_link_hover border-b border-div_border"
                      onClick={handleCancel}
                    >
                      <div className="w-10">
                        <img
                          src={photo}
                          alt={name}
                          className="rounded-full w-full"
                        />
                      </div>
                      <div>
                        <p>{name}</p>
                        <p className="username">@{username}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>

          <div>
            <p>ndbjkbdskvjsdn</p>
            <p>ndbjkbdskvjsdnmsflfsmlkgmfsk</p>
          </div>
        </div>
        <div className="self-center fixed bottom-0 w-[370px] border border-div_border rounded-t-xl shadow-xl">
          {activeRoom ? (
            <Room
              showMessageArea={showMessageArea}
              handleCloseMessage={handleCloseMessage}
            />
          ) : (
            <UserRooms
              showMessageArea={showMessageArea}
              handleCloseMessage={handleCloseMessage}
            />
          )}
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default SearchBar;
