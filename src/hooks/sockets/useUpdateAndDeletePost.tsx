import { addUpdatePost } from "@/redux/slice/postSlice";
import { POST } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";

const useUpdateAndDeletePost = (socket: Socket) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleUpdatePost = (data: POST) => {
      dispatch(addUpdatePost(data));
    };

    socket.on("update-post", handleUpdatePost);

    return () => {
      socket.off("update-post", handleUpdatePost);
    };
  }, [socket, dispatch]);
};

export default useUpdateAndDeletePost;
