import { Chat, Like, Post, Reply, Room, Save } from "@/types";
import getSocket from "./singleSocket";

const socket = getSocket();

export const isConnected = () => {
  socket.emit("isConnected", "i am from client", (response: string) => {
    console.log(response); // ojIckSD2jqNzOqIrAGzL
  });
};

// Join rooms
export const joinRooms = (rooms: string[]) => {
  socket.emit("joinRooms", rooms);
};

// Post socket handlers
export const onNewPost = (callback: (value: Post) => void) => {
  socket.on("newPost", callback);
};

export const offNewPost = (callback: (value: Post) => void) => {
  socket.off("newPost", callback);
};

export const onDeletePost = (callback: (value: string) => void) => {
  socket.on("deletePost", callback);
};

export const offDeletePost = (callback: (value: string) => void) => {
  socket.off("deletePost", callback);
};

// Reply socket handlers
export const onNewReply = (callback: (value: Reply) => void) => {
  socket.on("newReply", callback);
};

//Like socket handlers
export const onNewLike = (callback: (value: Like) => void) => {
  socket.on("newLike", callback);
};

export const offNewLike = (callback: (value: Like) => void) => {
  socket.off("newLike", callback);
};

export const onRemoveLike = (callback: (value: Like) => void) => {
  socket.on("removeLike", callback);
};

export const offRemoveLike = (callback: (value: Like) => void) => {
  socket.off("removeLike", callback);
};

//Save socket handlers
export const onNewSave = (callback: (value: Save) => void) => {
  socket.on("newSave", callback);
};

export const offNewSave = (callback: (value: Save) => void) => {
  socket.off("newSave", callback);
};

export const onRemoveSave = (callback: (value: Save) => void) => {
  socket.on("removeSave", callback);
};

export const offRemoveSave = (callback: (value: Save) => void) => {
  socket.off("removeSave", callback);
};

//Room socket handlers
export const onNewRoom = (callback: (value: Room) => void) => {
  socket.on("newRoom", callback);
};

export const offNewRoom = (callback: (value: Room) => void) => {
  socket.off("newRoom", callback);
};

export const onDeleteRoom = (callback: (value: string) => void) => {
  socket.on("deleteRoom", callback);
};

export const offDeleteRoom = (callback: (value: string) => void) => {
  socket.off("deleteRoom", callback);
};

//Chat socket handlers
export const onNewChat = (callback: (value: Chat) => void) => {
  socket.on("newChat", callback);
};

export const offNewChat = (callback: (value: Chat) => void) => {
  socket.off("newChat", callback);
};
