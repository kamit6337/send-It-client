import environment from "@/utils/environment";
import { io } from "socket.io-client";

const socket = io(environment.SERVER_URL, {
  withCredentials: true,
});

export const isConnected = () => {
  socket.emit("isConnected", "i am from client", (response) => {
    console.log(response); // ojIckSD2jqNzOqIrAGzL
  });
};

// Post socket handlers
export const onNewPost = (callback) => {
  socket.on("newPost", callback);
};

export const offNewPost = (callback) => {
  socket.off("newPost", callback);
};

export const onDeletePost = (callback) => {
  socket.on("deletePost", callback);
};

export const offDeletePost = (callback) => {
  socket.off("deletePost", callback);
};

// Reply socket handlers
export const onNewReply = (callback) => {
  socket.on("newReply", callback);
};

//Like socket handlers
export const onNewLike = (callback) => {
  socket.on("newLike", callback);
};

export const offNewLike = (callback) => {
  socket.off("newLike", callback);
};

export const onRemoveLike = (callback) => {
  socket.on("removeLike", callback);
};

export const offRemoveLike = (callback) => {
  socket.off("removeLike", callback);
};

//Save socket handlers
export const onNewSave = (callback) => {
  socket.on("newSave", callback);
};

export const offNewSave = (callback) => {
  socket.off("newSave", callback);
};

export const onRemoveSave = (callback) => {
  socket.on("removeSave", callback);
};

export const offRemoveSave = (callback) => {
  socket.off("removeSave", callback);
};

// Comment socket handlers
export const onNewComment = (callback) => {
  socket.on("newComment", callback);
};

export const emitCreateComment = (commentData) => {
  socket.emit("createComment", commentData);
};
