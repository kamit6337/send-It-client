import Post from "@/components/Post";
import useUserPosts from "@/hooks/useUserPosts";
import Loading from "@/lib/Loading";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const UserPosts = () => {
  const { username } = useParams();
  const { user } = useOutletContext();
  const { isLoading, error, data } = useUserPosts(user._id);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

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
