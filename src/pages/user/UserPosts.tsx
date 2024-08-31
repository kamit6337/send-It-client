import Post from "@/components/Post";
import useUserPosts from "@/hooks/useUserPosts";
import Loading from "@/lib/Loading";
import { addUserPostsCount } from "@/redux/slice/userSlice";
import { OutletContext, type Post as PostType } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

const UserPosts = () => {
  const dispatch = useDispatch();
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data } = useUserPosts(user._id);

  useEffect(() => {
    if (data) {
      const totalPosts = data.pages.reduce((prev, current) => {
        return prev + current.length;
      }, 0);
      dispatch(addUserPostsCount(totalPosts));
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

  if (data?.pages[0].length === 0) {
    return (
      <div className="h-96 flex justify-center items-center">
        You don't have any post
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
      <div className="h-96" />
    </>
  );
};

export default UserPosts;
