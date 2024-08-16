import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import CreatePost from "./CreatePost";
import usePosts from "@/hooks/usePosts";
import Loading from "@/lib/Loading";
import { useEffect, useState } from "react";
import {
  isConnected,
  offDeletePost,
  offNewPost,
  onDeletePost,
  onNewPost,
} from "@/lib/socketIO";
import { useOutletContext } from "react-router-dom";
import { getReq } from "@/utils/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollowingPosts,
  addSingleFollowingPost,
  removeSingleFollowingPost,
  userInitialState,
} from "@/redux/slice/userSlice";
import { type Post as PostType } from "@/types";

const Home = () => {
  const { followingPosts } = useSelector(userInitialState);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = usePosts();
  const { actualUser } = useOutletContext();

  useEffect(() => {
    isConnected();

    const handlePost = async (post: PostType) => {
      const { user } = post;

      if (user._id === actualUser._id) {
        dispatch(addSingleFollowingPost(post));
        return;
      }

      try {
        const response = await getReq("/user/following/check", {
          id: user._id,
        });

        if (!response?.data) return;
        dispatch(addSingleFollowingPost(post));
      } catch (error) {
        console.log("error in getting post", error);
      }
    };

    onNewPost(handlePost);

    return () => {
      offNewPost(handlePost);
    };
  }, [dispatch, actualUser._id]);

  useEffect(() => {
    const handleDeletePost = (id: string) => {
      dispatch(removeSingleFollowingPost(id));
    };
    onDeletePost(handleDeletePost);
    return () => {
      offDeletePost(handleDeletePost);
    };
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        dispatch(addFollowingPosts(data.data));
        return;
      }
      dispatch(addFollowingPosts(data.data));
    }
  }, [data, page, dispatch]);

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
        {followingPosts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
        <div className="h-96" />
      </div>
    </>
  );
};

export default Home;
