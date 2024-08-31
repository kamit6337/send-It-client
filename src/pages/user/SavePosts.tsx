import Post from "@/components/Post";
import useUserSavedPosts from "@/hooks/useUserSavedPosts";
import Loading from "@/lib/Loading";
import { offDeletePost, onDeletePost } from "@/lib/socketIO";
import { addUserSavedPostsCount } from "@/redux/slice/userSlice";
import { type Post as PostType } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SavePosts = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isLoading, error, data } = useUserSavedPosts();

  useEffect(() => {
    const handleDeletePost = (id: string) => {
      setPosts((prev) => {
        const filter = prev.filter((obj) => obj._id !== id);
        return filter;
      });
    };
    onDeletePost(handleDeletePost);
    return () => {
      offDeletePost(handleDeletePost);
    };
  }, []);

  useEffect(() => {
    dispatch(addUserSavedPostsCount(posts.length));
  }, [posts.length, dispatch]);

  if (isLoading) {
    return <Loading hScreen={false} small={false} />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <>
      {data?.pages?.map((page) => {
        return page.map((post: PostType) => {
          return <Post post={post} key={post._id} />;
        });
      })}
      <div className="h-96" />
    </>
  );
};

export default SavePosts;
