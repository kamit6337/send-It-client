import Post from "@/components/Post";
import useUserPosts from "@/hooks/useUserPosts";
import Loading from "@/lib/Loading";
import { offDeletePost, onDeletePost } from "@/lib/socketIO";
import { type Post as PostType } from "@/types";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const UserPosts = () => {
  const { username } = useParams();
  const { user } = useOutletContext();
  const { isLoading, error, data } = useUserPosts(user._id);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);

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
    if (data) {
      if (page === 1) {
        setPosts(data.data);

        return;
      }
      setPosts((prev) => [...data.data, ...prev]);
    }
  }, [data, page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [username]);

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
        return <Post key={post._id} post={post} />;
      })}
      <div className="h-96" />
    </>
  );
};

export default UserPosts;
