import { onUpdatePost } from "@/lib/socketIO";
import { offUpdatePost } from "@/lib/socketIO";
import {
  offDeletePost,
  offNewPost,
  onDeletePost,
  onNewPost,
} from "@/lib/socketIO";
import {
  addSingleFollowingPost,
  addToUpdatePost,
  deletePost,
} from "@/redux/slice/postSlice";
import { Post, PostSocket, User } from "@/types";
import { getReq } from "@/utils/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useNewPostToggle = (actualUser: User) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePost = async (post: Post) => {
      const { user } = post;

      if (user._id === actualUser._id) {
        const followingPostState = queryClient.getQueryState([
          "following posts",
        ]);

        if (followingPostState) {
          queryClient.setQueryData(["following posts"], (old: PostSocket) => {
            const newPages = [...old.pages];
            newPages[0] = [post, ...newPages[0]];
            return { ...old, pages: newPages };
          });
        }

        const userPostState = queryClient.getQueryState([
          "user posts",
          actualUser._id,
        ]);

        if (userPostState) {
          queryClient.setQueryData(
            ["user posts", actualUser._id],
            (old: PostSocket) => {
              const newPages = [...old.pages];
              newPages[0] = [post, ...newPages[0]];
              return { ...old, pages: newPages };
            }
          );
        }
        return;
      }

      try {
        const response = await getReq("/user/following/check", {
          id: user._id,
        });

        if (!response?.data) return;

        dispatch(addSingleFollowingPost(post));
      } catch (error) {
        console.log("error in getting post", error);
      }
    };

    const handleUpdatePost = (obj: Post) => {
      console.log("updated post", obj);

      dispatch(addToUpdatePost(obj));
    };

    const handleDeletePost = (id: string) => {
      dispatch(deletePost(id));
    };

    onNewPost(handlePost);
    onDeletePost(handleDeletePost);
    onUpdatePost(handleUpdatePost);

    return () => {
      offNewPost(handlePost);
      offDeletePost(handleDeletePost);
      offUpdatePost(handleUpdatePost);
    };
  }, [actualUser._id, dispatch]);

  return;
};

export default useNewPostToggle;
