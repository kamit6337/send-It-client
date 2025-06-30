import { setActiveRoom } from "@/redux/slice/roomSlice";
import { CHAT, ROOM } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import useLoginCheck from "../auth/useLoginCheck";

type OLD_CHAT = {
  pages: CHAT[][];
};

type DELETE_CHAT = {
  chatId: string;
  roomId: string;
};

const useNewRoomAndChat = (socket: Socket) => {
  const { data: actualUser } = useLoginCheck();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // MARK: ROOM NEW AND DELETE
  useEffect(() => {
    if (!socket) return;

    const handleNewRoom = (data: ROOM) => {
      const newRoom = data;
      // dispatch(setActiveRoom(newRoom));

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

  // MARK: CHAT NEW AND DELETE
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

      const checkRoomStatus = queryClient.getQueryState(["user rooms"]);

      if (
        checkRoomStatus?.status === "success" &&
        newChat.sender !== actualUser._id
      ) {
        queryClient.setQueryData(["user rooms"], (old: ROOM[] = []) => {
          const modifyRoom = old.map((room) => {
            if (room._id === newChat.room) {
              const prevCount = room.unSeenChatsCount;
              return { ...room, unSeenChatsCount: prevCount + 1 };
            }

            return room;
          });

          return modifyRoom;
        });
      }
    };

    const handleDeleteChat = (data: DELETE_CHAT) => {
      const { chatId, roomId } = data;

      const checkStatus = queryClient.getQueryState(["room chats", roomId]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(["room chats", roomId], (old: OLD_CHAT) => {
          const modifyPages = old.pages.map((page) =>
            page.map((chat) => {
              if (chat._id === chatId) {
                return { ...chat, deleted: true };
              }
              return chat;
            })
          );
          return { ...old, pages: modifyPages };
        });
      }
    };

    socket.on("new-chat", handleNewChat);
    socket.on("delete-chat", handleDeleteChat);

    return () => {
      socket.off("new-chat", handleNewChat);
      socket.off("delete-chat", handleDeleteChat);
    };
  }, [socket, queryClient]);
};

export default useNewRoomAndChat;
