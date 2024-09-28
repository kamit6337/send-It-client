import Post from "@/components/Post";
import useUserSavedPosts from "@/hooks/useUserSavedPosts";
import Loading from "@/lib/Loading";
import { type Post as PostType } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";

const SavePosts = () => {
  const { isLoading, error, data, isFetching, fetchNextPage } =
    useUserSavedPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

  if (isLoading) {
    return (
      <div className="h-96 w-full">
        <Loading hScreen={false} small={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  if (data?.pages[0].length === 0) {
    return (
      <>
        <Helmet>
          <title>User Saved</title>
          <meta name="discription" content="User Saved page of this project" />
        </Helmet>
        <div className="h-96 flex justify-center items-center">
          You don't have any save post
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Saved</title>
        <meta name="discription" content="User Saved page of this project" />
      </Helmet>
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
    </>
  );
};

export default SavePosts;
