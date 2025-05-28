import CreateNewPost from "@/components/CreateNewPost/CreateNewPost";
import Post from "@/components/Post/Post";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useAddNewPosts from "@/hooks/posts/useAddNewPosts";
import useFollowingUserPosts from "@/hooks/posts/useFollowingUserPosts";
import Loading from "@/lib/Loading";
import { postState } from "@/redux/slice/postSlice";
import { REPLY } from "@/types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const Home = () => {
  const { data: user } = useLoginCheck();
  const { allNewPosts } = useSelector(postState);
  const clickToAllNewPosts = useAddNewPosts();
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFollowingUserPosts();
  const [showTopNewPostBtn, setShowTopNewPostBtn] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 300) {
        setShowTopNewPostBtn(true);
      } else {
        setShowTopNewPostBtn(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const posts = data?.pages.flatMap((page) => page) as REPLY[];

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      {showTopNewPostBtn && allNewPosts.length > 0 && (
        <button
          className="fixed top-5 z-10 left-1/2 -translate-x-1/2 px-5 py-2 rounded bg-sky_blue text-white"
          onClick={() => clickToAllNewPosts()}
        >
          New Posts ({allNewPosts.length})
        </button>
      )}
      <div className="border-b-2">
        <CreateNewPost user={user} atHomePage={true} />
      </div>
      {allNewPosts.length > 0 && (
        <button
          className="w-full p-3 border-b-2 flex justify-center text-sky_blue"
          onClick={() => clickToAllNewPosts()}
        >
          Show New Messages ({allNewPosts.length})
        </button>
      )}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => {
            const { replies } = post;

            return (
              <>
                {post.replyPost && (
                  <Post post={post.replyPost} showLine={true} />
                )}
                <Post post={post} showLine={replies.length > 0} />
                {replies.length > 0 &&
                  replies.map((reply, i, arr) => {
                    const lastReply = i === arr.length - 1;

                    return <Post post={reply} showLine={!lastReply} />;
                  })}
              </>
            );
          })
        ) : (
          <p className="h-96 flex justify-center items-center">
            No Post available yet
          </p>
        )}
      </div>

      {isFetchingNextPage && <div>Loading ...</div>}
      <div
        ref={hasNextPage && !isFetchingNextPage ? ref : null}
        className="h-96"
      />
    </>
  );
};

export default Home;
