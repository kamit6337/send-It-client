import ReactIcons from "@/assets/icons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useLoginCheck from "@/hooks/useLoginCheck";
import { User, type Room as RoomType } from "@/types";
import dayMonthYear from "@/utils/javascript/dayMonthYear";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import { deleteReq } from "@/utils/api/api";
import Toastify, { ToastContainer } from "@/lib/Toastify";

type Props = {
  room: RoomType;
  handleNavigate: (value: string) => void;
};

const Room = ({ room, handleNavigate }: Props) => {
  const navigate = useNavigate();
  const { _id, users, createdAt } = room;
  const { data: actualUser } = useLoginCheck();
  const { pathname } = useLocation();
  const [showOption, setShowOption] = useState(false);
  const [showRoomOptions, setShowRoomOptions] = useState(false);
  const { showErrorMessage } = Toastify();

  const member = users.find((user) => user._id !== actualUser._id) as User;

  const roomId = pathname.startsWith("/messages/")
    ? pathname.split("/").at(-1)
    : "";

  const { name, username, photo } = member;
  const isRoomActive = roomId === _id;

  console.log("showOption", showOption);

  const handleClose = () => {
    setShowRoomOptions(false);
    setShowOption(false);
  };

  const handleDelete = async () => {
    try {
      await deleteReq("/room", { id: _id });
      navigate("/messages");
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    }
  };

  return (
    <>
      <Dialog>
        <main
          key={_id}
          className={`${
            isRoomActive ? "bg-gray-200" : "hover:bg-gray-100"
          } flex gap-2 p-3 group/item`}
          onMouseEnter={() => setShowOption(true)}
          onMouseLeave={handleClose}
          // onMouseLeave={(e) => {
          //   // Type assertion to Node
          //   const relatedTargetNode = e.relatedTarget as Node | null;
          //   if (!e.currentTarget.contains(relatedTargetNode)) {
          //     setShowOption(false);
          //   }
          // }}
        >
          <div
            className="w-10 cursor-pointer"
            onClick={() => handleNavigate(_id)}
          >
            <img
              src={photo}
              alt={name}
              className="w-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1 flex items-center justify-between ">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigate(_id)}
            >
              <div
                className={`${
                  showOption && "flex-shrink-0 w-32"
                } flex overflow-hidden`}
              >
                <p className="truncate">{name}</p>
                <p className="text-grey truncate">@{username}</p>
              </div>
              <p>
                <ReactIcons.dot />
              </p>
              <p className="text-sm text-grey">{dayMonthYear(createdAt)}</p>
            </div>

            {/* <p className="text-gray-500">{latestChat?.message}</p> */}

            <div
            // onMouseEnter={() => setShowOption(true)}
            // onMouseLeave={(e) => {
            //   // Type assertion to Node
            //   const relatedTargetNode = e.relatedTarget as Node | null;
            //   if (!e.currentTarget.contains(relatedTargetNode)) {
            //     setShowOption(false);
            //   }
            // }}
            >
              {showOption && (
                <>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowRoomOptions(true)}
                  >
                    <button className="p-2 rounded-full hover:bg-sky-200 hover:text-sky_blue">
                      <ReactIcons.threeDot />
                    </button>
                    {showRoomOptions && (
                      <DialogTrigger onClick={handleClose}>
                        <div className="absolute z-10 top-full mt-2 right-0 bg-background border border-div_border rounded-md p-[2px] w-60">
                          <button className="w-full p-2 rounded-md hover:bg-gray-100 text-red-500">
                            Delete
                          </button>
                        </div>
                      </DialogTrigger>
                    )}
                  </div>
                </>
                // <Dialog>
                //   <DropdownMenu>
                //     <DropdownMenuTrigger>
                //       <button className="p-2 rounded-full hover:bg-sky-200 hover:text-sky_blue">
                //         <ReactIcons.threeDot />
                //       </button>
                //     </DropdownMenuTrigger>
                //     <RoomOptions _id={_id} />
                //   </DropdownMenu>
                // </Dialog>
              )}
            </div>
          </div>
        </main>
        <DialogContent className="w-80 p-0">
          <ConfirmDelete handleDelete={handleDelete} />
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Room;
