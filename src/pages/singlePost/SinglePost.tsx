import PostDetails from "@/components/Post_Details/PostDetails";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useSinglePost from "@/hooks/posts/useSinglePost";
import Loading from "@/lib/Loading";
import { PARAMS, POST } from "@/types";
import { useParams } from "react-router-dom";
import PostReplies from "./PostReplies";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import { useEffect } from "react";

const SinglePost = () => {
  const { id } = useParams() as PARAMS;
  const { data: actualUser } = useLoginCheck();

  const { isLoading, error, data } = useSinglePost(id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const post = data as POST;

  return (
    <section className="">
      <LeftArrowBtn title="Post" />
      <div className="pt-3">
        <PostDetails post={post} />
      </div>
      <PostReplies id={id} actualUser={actualUser} />
      <div className="h-96" />
    </section>
  );
};

export default SinglePost;
