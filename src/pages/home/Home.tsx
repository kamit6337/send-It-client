import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import CreatePost from "./CreatePost";
import usePosts from "@/hooks/usePosts";
import Loading from "@/lib/Loading";
import { useEffect, useState } from "react";

const Home = () => {
  const { isLoading, error, data } = usePosts();
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

  const addNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div className="">
        <CreatePost addNewPost={addNewPost} />
        {posts.map((post, i) => {
          return <Post post={post} key={i} />;
        })}
        <div className="h-96" />
      </div>
    </>
  );
};

export default Home;
