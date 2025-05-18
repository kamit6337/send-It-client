import ReactIcons from "@/assets/icons";
import { useState } from "react";
import useDebounce from "@/hooks/general/useDebounce";
import useUserSearch from "@/hooks/user/useUserSearch";
import { USER } from "@/types";
import getGraphql from "@/utils/api/graphql";
import createNewRoomSchema, {
  createNewRoomDataQuery,
} from "@/graphql/room/createNewRoomSchema";
import Toastify from "@/lib/Toastify";

type Props = {
  handleClose: () => void;
};

const SelectMessageUser = ({ handleClose }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { showErrorMessage } = Toastify();
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

  const handleCreateRoom = async (id: string) => {
    try {
      const response = await getGraphql(
        createNewRoomSchema,
        createNewRoomDataQuery,
        { userId: id }
      );

      console.log("new room response", response);
      handleClose();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
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
              value={input}
              placeholder="Search"
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoComplete="off"
              spellCheck="false"
              className="bg-inherit text-sm w-full px-2 outline-none"
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
            searchedUsers.map((obj: USER) => {
              const { _id, name, email, photo } = obj;

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
                    <p className="username">{email}</p>
                  </div>
                </button>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default SelectMessageUser;
