import ReactIcons from "@/assets/icons";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getReq, postReq } from "@/utils/api/api";
import debounce from "@/utils/javascript/debounce";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogClose } from "./ui/dialog";

const SelectMessageUser = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { showErrorMessage } = Toastify();
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showCancel, setShowCancel] = useState(false);

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

  const handleChange = (value: string) => {
    if (!value || value === "") {
      setShowCancel(false);
      setSearchedUsers([]);
      return;
    }

    setShowCancel(true);
    debouncedSearch(value);
  };

  const handleCreateRoom = async (id: string) => {
    try {
      const response = await postReq("/room", { id });

      console.log("new room response", response);
      closeRef.current?.click();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  const handleCancel = () => {
    reset();
    setShowCancel(false);
    setIsFocused(false);
    setSearchedUsers([]);
  };

  return (
    <>
      <section>
        <div className="p-5 space-y-5">
          <p>New Message</p>
          <div className="bg-search_bg flex items-center p-3 input_div">
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
        </div>
        <div className="border-t border-div_border">
          {searchedUsers?.length > 0 &&
            searchedUsers.map((obj) => {
              const { _id, name, username, photo } = obj;

              return (
                <button
                  key={_id}
                  className="p-3 flex gap-3 w-full hover:bg-sidebar_link_hover border-b border-div_border"
                  onClick={() => handleCreateRoom(_id)}
                >
                  <div className="w-10">
                    <img
                      src={photo}
                      alt={name}
                      className="rounded-full w-full"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p>{name}</p>
                    <p className="username">@{username}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </section>
      <DialogClose ref={closeRef} asChild className="hidden">
        <button>close</button>
      </DialogClose>
      <ToastContainer />
    </>
  );
};

export default SelectMessageUser;
