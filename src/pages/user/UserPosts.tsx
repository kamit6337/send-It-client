import Post from "@/components/Post";
import useUserPosts from "@/hooks/useUserPosts";
import Loading from "@/lib/Loading";
import { offDeletePost, onDeletePost } from "@/lib/socketIO";
import { addUserPostsCount } from "@/redux/slice/userSlice";
import { OutletContext, type Post as PostType } from "@/types";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

const UserPosts = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { user } = useOutletContext<OutletContext>();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isLoading, error, data } = useUserPosts(user._id, page);

  useEffect(() => {
    if (data) {
      setPosts((prev) => {
        const filter = generateUniqueIDArray([...data.data, ...prev]);
        return filter;
      });
    }
  }, [data]);

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
    dispatch(addUserPostsCount(posts.length));
  }, [posts.length, dispatch]);

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
