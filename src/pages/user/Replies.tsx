import ReplyPost from "@/components/reply/ReplyPost";
import useUserReplyPosts from "@/hooks/user/useUserReplyPosts";
import Loading from "@/lib/Loading";
import { REPLY, USER } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

type OutletContext = {
  user: USER;
};

const Replies = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, isFetching, fetchNextPage } =
    useUserReplyPosts(user._id);

  const { ref, inView } = useInView();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  const reply = data?.pages.flatMap((page) => page) as REPLY[];

  return (
    <>
      <Helmet>
        <title>User Reply</title>
        <meta name="discription" content="User Post page of this project" />
      </Helmet>
      {reply.length > 0 ? (
        reply.map((reply) => (
          <ReplyPost reply={reply} key={reply._id} userReply={true} />
        ))
      ) : (
        <div className="h-96 flex justify-center items-center">
          You don't have any post
        </div>
      )}

      <div ref={ref} className="h-96" />
    </>
  );
};

export default Replies;
