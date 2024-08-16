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
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useUserSavedPosts(page);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setPosts(data.data);
        return;
      }
      setPosts((prev) => [...data.data, ...prev]);
    }
  }, [data, page]);

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
      {posts.map((post) => {
        return <Post key={post._id} post={post} defaultSave={true} />;
      })}
      <div className="h-96" />
    </>
  );
};

export default SavePosts;
