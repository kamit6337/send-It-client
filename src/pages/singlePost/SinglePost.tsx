import ReactIcons from "@/assets/icons";
import Post from "@/components/Post/Post";
import PostDetails from "@/components/Post_Details/PostDetails";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useSinglePost from "@/hooks/posts/useSinglePost";
import Loading from "@/lib/Loading";
import { PARAMS, POST } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import PostReplies from "./PostReplies";
import LeftArrowBtn from "@/components/LeftArrowBtn";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams() as PARAMS;
  const { data: actualUser } = useLoginCheck();

  const { isLoading, error, data } = useSinglePost(id);

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
        <PostDetails post={post} actualUser={actualUser} />
      </div>
      <PostReplies id={id} actualUser={actualUser} />
      <div className="h-96" />
    </section>
  );
};

export default SinglePost;
