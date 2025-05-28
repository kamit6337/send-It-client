import { postState, removeAllNewPosts } from "@/redux/slice/postSlice";
import { POST } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

type OLD = {
  pages: POST[][];
};

const useAddNewPosts = () => {
  const queryClient = useQueryClient();
  const { allNewPosts } = useSelector(postState);
  const dispatch = useDispatch();

  const addNewPostsToFollowings = useCallback(() => {
    const checkStatus = queryClient.getQueryState(["following posts"]);

    if (checkStatus?.status === "success") {
      queryClient.setQueryData(["following posts"], (old: OLD) => {
        const modifyPages = old.pages.map((page) => [...page]);
        modifyPages[0] = [...allNewPosts, ...modifyPages[0]];
        return { ...old, pages: modifyPages };
      });
    }

    dispatch(removeAllNewPosts());

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return addNewPostsToFollowings;
};

export default useAddNewPosts;
