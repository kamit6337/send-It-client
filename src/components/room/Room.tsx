import ReactIcons from "@/assets/icons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ROOM, USER } from "@/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify from "@/lib/Toastify";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import ConfirmDelete from "./ConfirmDelete";
import getGraphql from "@/utils/api/graphql";
import deleteRoomSchema, {
  deleteRoomDataQuery,
} from "@/graphql/room/deleteRoomSchema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  room: ROOM;
  handleNavigate: (value: ROOM) => void;
};

const Room = ({ room, handleNavigate }: Props) => {
  const navigate = useNavigate();
  const { _id, users } = room;
  const { data: actualUser } = useLoginCheck();
  const { pathname } = useLocation();
  const { showErrorMessage } = Toastify();

  const member = users.find((user) => user._id !== actualUser._id) as USER;

  const roomId = pathname.startsWith("/messages/")
    ? pathname.split("/").at(-1)
    : "";

  const { name, email, photo } = member;

  const isRoomActive = roomId === _id;

  const handleDelete = async () => {
    try {
      const response = await getGraphql(deleteRoomSchema, deleteRoomDataQuery, {
        roomId: _id,
      });

      console.log("response delete room", response);

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
          } group flex items-center justify-between gap-2 p-3`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 shrink-0 cursor-pointer"
              onClick={() => handleNavigate(room)}
            >
              <img
                src={photo}
                alt={name}
                className="w-full object-cover rounded-full"
              />
            </div>
            <div
              className="flex-1 flex items-center justify-between cursor-pointer"
              onClick={() => handleNavigate(room)}
            >
              <div className={`flex flex-col max-w-40`}>
                <p className="truncate">{name}</p>
                <p className="text-grey truncate">{email}</p>
              </div>
            </div>
          </div>

          <div className="w-10 shrink-0 invisible group-hover:visible">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-full hover:bg-sky-200 hover:text-sky_blue">
                <ReactIcons.threeDot />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger className="w-full">
                  <DropdownMenuItem className="w-full">Delete</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>
        <DialogContent className="w-80 p-0">
          <ConfirmDelete handleDelete={handleDelete} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Room;
