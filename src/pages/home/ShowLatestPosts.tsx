import { clearFollowingPost, postState } from "@/redux/slice/postSlice";
import { PostSocket } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const ShowLatestPosts = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { followingPosts } = useSelector(postState);

  const handleShowNewPost = () => {
    const followingPostState = queryClient.getQueryState(["following posts"]);

    if (followingPostState) {
      queryClient.setQueryData(["following posts"], (old: PostSocket) => {
        const newPages = [...old.pages];
        newPages[0] = [...followingPosts, ...newPages[0]];
        return { ...old, pages: newPages };
      });

      dispatch(clearFollowingPost());
    }
  };

  if (followingPosts.length > 0) {
    return (
      <button
        onClick={handleShowNewPost}
        className="w-full hover:bg-sidebar_link_hover border-b border-div_border text-center py-2 text-sm"
      >
        Show latest tweet
      </button>
    );
  }

  return;
};

export default ShowLatestPosts;
