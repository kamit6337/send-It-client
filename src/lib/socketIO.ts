import { Chat, Like, Post, Reply, ReplyFull, Room, Save } from "@/types";
import getSocket from "./singleSocket";

const socket = getSocket();

export const isConnected = () => {
  socket.emit("isConnected", "i am from client", (response: string) => {
    console.log(response); // ojIckSD2jqNzOqIrAGzL
  });
};

export const keepAliveConnection = () => {
  socket.emit("keepAlive", { message: "ping" });
};

// Join rooms
export const joinRooms = (rooms: string[]) => {
  socket.emit("joinRooms", rooms);
};

// NOTE: NOTIFICATION SOCKET HANDLERS
export const onNewNotification = (callback: (value) => void) => {
  socket.on("newNotification", callback);
};

export const offNewNotification = (callback: (value) => void) => {
  socket.off("newNotification", callback);
};

// NOTE: FOLLOWING SOCKET HANDLERS
export const onNewView = (callback: (value) => void) => {
  socket.on("newView", callback);
};

export const offNewView = (callback: (value) => void) => {
  socket.off("newView", callback);
};

// NOTE: FOLLOWING SOCKET HANDLERS
export const onNewFollower = (callback: (value) => void) => {
  socket.on("newFollowing", callback);
};

export const offNewFollower = (callback: (value) => void) => {
  socket.off("newFollowing", callback);
};

export const onRemoveFollower = (callback: (value) => void) => {
  socket.on("removeFollowing", callback);
};

export const offRemoveFollower = (callback: (value) => void) => {
  socket.off("removeFollowing", callback);
};

// Post socket handlers
export const onNewPost = (callback: (value: Post) => void) => {
  socket.on("newPost", callback);
};

export const offNewPost = (callback: (value: Post) => void) => {
  socket.off("newPost", callback);
};

export const onUpdatePost = (callback: (value: Post) => void) => {
  socket.on("updatePost", callback);
};

export const offUpdatePost = (callback: (value: Post) => void) => {
  socket.off("updatePost", callback);
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

export const offNewReply = (callback: (value: Reply) => void) => {
  socket.off("newReply", callback);
};

export const onUpdateReply = (callback: (value: Reply) => void) => {
  socket.on("updateReply", callback);
};

export const offUpdateReply = (callback: (value: Reply) => void) => {
  socket.off("updateReply", callback);
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
