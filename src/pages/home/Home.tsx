import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { deleteReq, postReq } from "@/utils/api/api";
import usePosts from "@/hooks/usePosts";
import Loading from "@/lib/Loading";

const Home = () => {
  const { showErrorMessage } = Toastify();
  const [likedPosts, setLikedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const { isLoading, error, data } = usePosts();

  useEffect(() => {
    if (data) {
      setPosts((prev) => [...data.data, ...prev]);
    }
  }, [data]);

  const addNewPost = (data: any) => {
    setPosts((prev) => [data, ...prev]);
  };

  const handleCreateLike = async (id: string) => {
    try {
      const response = await postReq("/user/like", { id });
      setLikedPosts((prev) => [response.data, ...prev]);
      setPosts((prev) =>
        prev.map((obj) => {
          if (obj._id === id) {
            obj.likeCount = obj.likeCount + 1;
          }

          return obj;
        })
      );
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleRemoveLike = async (id: string) => {
    try {
      await deleteReq("/user/like", { id });
      setLikedPosts((prev) => prev.filter((obj) => obj.post !== id));
      setPosts((prev) =>
        prev.map((obj) => {
          if (obj._id === id) {
            obj.likeCount = obj.likeCount - 1;
          }

          return obj;
        })
      );
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta name="discription" content="Home page of this project" />
        </Helmet>
        <div className="w-full h-96">
          <Loading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta name="discription" content="Home page of this project" />
        </Helmet>
        <div className="w-full h-96">
          <p>{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <CreatePost addNewPost={addNewPost} />
        {posts.map((post, i) => {
          const isLiked = likedPosts.find((obj) => obj.post === post._id);

          return (
            <Post
              post={post}
              key={i}
              handleCreateLike={handleCreateLike}
              handleRemoveLike={handleRemoveLike}
              isLiked={!!isLiked}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
