import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import CreatePost from "./CreatePost";
import usePosts from "@/hooks/usePosts";
import Loading from "@/lib/Loading";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext, type Post as PostType } from "@/types";
import { useInView } from "react-intersection-observer";
import useNewPostToggle from "@/hooks/generals/useNewPostToggle";

const Home = () => {
  const { isLoading, error, data, fetchNextPage } = usePosts();
  const { actualUser } = useOutletContext<OutletContext>();
  const { ref, inView } = useInView();
  useNewPostToggle(actualUser);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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

  // return <div>Home</div>;

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div className="">
        <CreatePost />
        {data?.pages?.map((page) => {
          return page.map((post: PostType) => {
            return <Post post={post} key={post._id} />;
          });
        })}
        <div ref={ref} className="h-96" />
      </div>
    </>
  );
};

export default Home;
