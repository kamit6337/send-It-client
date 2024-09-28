import ReplyPost from "@/pages/reply/ReplyPost";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserReplies from "@/hooks/useUserReplies";
import Loading from "@/lib/Loading";
import { OutletContext, ReplyFull } from "@/types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

const Replies = () => {
  const { data: actualUser } = useLoginCheck();
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, isFetching, fetchNextPage } = useUserReplies(
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
      <div className="h-96">
        <p>{error.message}</p>
      </div>
    );
  }

  if (data?.pages[0].length === 0) {
    return (
      <>
        <Helmet>
          <title>User Replies</title>
          <meta
            name="discription"
            content="User Replies page of this project"
          />
        </Helmet>
        <div className="h-96 flex justify-center items-center">
          You don't have any replies
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Replies</title>
        <meta name="discription" content="User Replies page of this project" />
      </Helmet>
      {data?.pages?.map((page) => {
        return page.map((reply: ReplyFull) => {
          const { post, replyPost, _id } = reply;

          return (
            <ReplyPost
              key={_id}
              post={post}
              replyPost={replyPost}
              actualUser={actualUser}
              userReply={true}
            />
          );
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

export default Replies;
