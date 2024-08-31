import Post from "@/components/Post";
import useUserLikedPosts from "@/hooks/useUserLikedPosts";
import Loading from "@/lib/Loading";
import { addUserLikePostsCount } from "@/redux/slice/userSlice";
import { type Post as PostType } from "@/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

const Likes = () => {
  const dispatch = useDispatch();
  const { isLoading, error, data, fetchNextPage } = useUserLikedPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const totalPosts = data.pages.reduce((prev, current) => {
        return prev + current.length;
      }, 0);
      dispatch(addUserLikePostsCount(totalPosts));
    }
  }, [data, dispatch]);

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
      {data?.pages?.map((page) => {
        return page.map((post: PostType) => {
          return <Post post={post} key={post._id} />;
        });
      })}
      <div ref={ref} className="h-96" />
    </>
  );
};

export default Likes;
