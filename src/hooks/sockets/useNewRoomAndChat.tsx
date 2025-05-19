import { setActiveRoom } from "@/redux/slice/roomSlice";
import { CHAT, ROOM } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

type OLD_CHAT = {
  pages: CHAT[][];
};

const useNewRoomAndChat = (socket: Socket) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewRoom = (data: ROOM) => {
      console.log("new room", data);
      const newRoom = data;
      dispatch(setActiveRoom(newRoom));

      const checkStatus = queryClient.getQueryState(["user rooms"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["user rooms"], (old: ROOM[] = []) => {
          return [newRoom, ...old];
        });
      }
    };

    const handleDeleteRoom = (data: string) => {
      const roomId = data;

      const checkStatus = queryClient.getQueryState(["user rooms"]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["user rooms"], (old: ROOM[] = []) => {
          const filterRooms = old.filter((room) => room._id !== roomId);
          return filterRooms;
        });
      }

      dispatch(setActiveRoom(null));
    };

    socket.on("new-room", handleNewRoom);
    socket.on("delete-room", handleDeleteRoom);

    return () => {
      socket.off("new-room", handleNewRoom);
      socket.off("delete-room", handleDeleteRoom);
    };
  }, [socket, queryClient]);

  useEffect(() => {
    if (!socket) return;

    const handleNewChat = (data: CHAT) => {
      const newChat = data;

      const checkStatus = queryClient.getQueryState([
        "room chats",
        newChat.room,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["room chats", newChat.room],
          (old: OLD_CHAT) => {
            const modifyPages = old.pages.map((page) => [...page]);

            modifyPages[0] = [newChat, ...modifyPages[0]];

            return { ...old, pages: modifyPages };
          }
        );
      }
    };

    socket.on("new-chat", handleNewChat);

    return () => {
      socket.off("new-chat", handleNewChat);
    };
  }, [socket, queryClient]);
};

export default useNewRoomAndChat;
