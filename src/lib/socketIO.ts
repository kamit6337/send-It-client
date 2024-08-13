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

// Post socket handlers
export const onNewReply = (callback) => {
  socket.on("newReply", callback);
};

export const emitCreatePost = (post) => {
  socket.emit("createPost", post);
};

// Like socket handlers
export const onNewLike = (callback) => {
  socket.on("newLike", callback);
};

export const emitLikePost = (likeData) => {
  socket.emit("likePost", likeData);
};

// Comment socket handlers
export const onNewComment = (callback) => {
  socket.on("newComment", callback);
};

export const emitCreateComment = (commentData) => {
  socket.emit("createComment", commentData);
};
