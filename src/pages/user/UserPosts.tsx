import Post from "@/components/Post";
import useUserPosts from "@/hooks/useUserPosts";
import Loading from "@/lib/Loading";
import { OutletContext, type Post as PostType } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

const UserPosts = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, isFetching, fetchNextPage } = useUserPosts(
    user._id
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

  if (isLoading) {
    return (
      <div className="h-96">
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
          <title>User Posts</title>
          <meta name="discription" content="User Post page of this project" />
        </Helmet>
        <div className="h-96 flex justify-center items-center">
          You don't have any post
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Posts</title>
        <meta name="discription" content="User Post page of this project" />
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

export default UserPosts;
