import {
  offDeletePost,
  offNewPost,
  onDeletePost,
  onNewPost,
} from "@/lib/socketIO";
import { Post, User } from "@/types";
import { getReq } from "@/utils/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useNewPostToggle = (actualUser: User) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handlePost = async (post: Post) => {
      const { user } = post;

      console.log("new post", post);

      if (user._id === actualUser._id) {
        queryClient.setQueryData(["following posts"], (old) => {
          const newPages = [...old.pages];
          newPages[0] = [post, ...newPages[0]];
          return { ...old, pages: newPages };
        });
        return;
      }

      try {
        const response = await getReq("/user/following/check", {
          id: user._id,
        });

        if (!response?.data) return;

        queryClient.setQueryData(["following posts"], (old) => {
          const newPages = [...old.pages];
          newPages[0] = [post, ...newPages[0]];
          return { ...old, pages: newPages };
        });
      } catch (error) {
        console.log("error in getting post", error);
      }
    };

    const handleDeletePost = (id: string) => {
      // delete logic
    };

    onNewPost(handlePost);
    onDeletePost(handleDeletePost);

    return () => {
      offNewPost(handlePost);
      offDeletePost(handleDeletePost);
    };
  }, [queryClient, actualUser._id]);

  return;
};

export default useNewPostToggle;
