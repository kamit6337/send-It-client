import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import CreatePost from "./CreatePost";
import usePosts from "@/hooks/usePosts";
import Loading from "@/lib/Loading";
import { useEffect } from "react";
import { type Post as PostType } from "@/types";
import { useInView } from "react-intersection-observer";
import ShowLatestPosts from "./ShowLatestPosts";

const Home = () => {
  const { isLoading, error, data, fetchNextPage, isFetching } = usePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

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
      <div className="">
        <CreatePost />
        <ShowLatestPosts />

        {data?.pages?.map((page) => {
          return page.map((post: PostType) => {
            return <Post post={post} key={post._id} />;
          });
        })}
        {isFetching && (
          <div className="h-96">
            <Loading hScreen={false} small={false} />
          </div>
        )}
        <div ref={ref} className="h-96" />
      </div>
    </>
  );
};

export default Home;
