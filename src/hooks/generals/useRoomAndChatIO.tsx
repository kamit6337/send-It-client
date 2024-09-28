import {
  joinRooms,
  offDeleteRoom,
  offNewChat,
  offNewRoom,
  onDeleteRoom,
  onNewChat,
  onNewRoom,
} from "@/lib/socketIO";
import { addSingleRoom, removeRoom, roomState } from "@/redux/slice/roomSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat, type Room as RoomType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

const useRoomAndChatIO = (actualUser) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector(roomState);
  const queryClient = useQueryClient();

  useEffect(() => {
    const keepRoomJoined = setInterval(() => {
      if (rooms.length === 0) return;
      const roomIds = rooms.map((room) => room._id);
      joinRooms([actualUser._id, ...roomIds]);
    }, 30000);

    return () => {
      clearInterval(keepRoomJoined);
    };
  }, [rooms]);

  useEffect(() => {
    const handleChat = (chat: Chat) => {
      console.log("Chat", chat);

      const checkRoomState = queryClient.getQueryState([
        "room chats",
        chat.room,
      ]);

      if (checkRoomState) {
        queryClient.setQueryData(["room chats", chat.room], (old) => {
          const newPages = [...old.pages];
          newPages[0] = [chat, ...newPages[0]];
          return { ...old, pages: newPages };
        });
      }
    };

    onNewChat(handleChat);

    return () => {
      offNewChat(handleChat);
    };
  }, []);

  useEffect(() => {
    const handleNewRoom = (response: RoomType) => {
      const { users } = response;
      const findUser = users.find((user) => user._id === actualUser._id);
      if (!findUser) return;
      dispatch(addSingleRoom(response));
    };

    const handleDeleteRoom = (id: string) => {
      console.log("delete response", id);
      dispatch(removeRoom(id));
    };

    onNewRoom(handleNewRoom);
    onDeleteRoom(handleDeleteRoom);

    return () => {
      offNewRoom(handleNewRoom);
      offDeleteRoom(handleDeleteRoom);
    };
  }, [actualUser._id, dispatch]);
};

export default useRoomAndChatIO;
