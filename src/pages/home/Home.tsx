import Post from "@/components/Post/Post";
import useFollowingUserPosts from "@/hooks/posts/useFollowingUserPosts";
import Loading from "@/lib/Loading";
import { POST } from "@/types";
import { Helmet } from "react-helmet";

const Home = () => {
  const { isLoading, error, data } = useFollowingUserPosts();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const posts = data?.pages.flatMap((page) => page) as POST[];

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default Home;
