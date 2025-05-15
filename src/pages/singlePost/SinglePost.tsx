import ReactIcons from "@/assets/icons";
import Post from "@/components/Post/Post";
import PostDetails from "@/components/Post_Details/PostDetails";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useSinglePost from "@/hooks/posts/useSinglePost";
import Loading from "@/lib/Loading";
import { PARAMS, POST } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import PostReplies from "./PostReplies";

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
      <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
        <button className="left_arrow" onClick={() => navigate(-1)}>
          <ReactIcons.leftArrow className="text-xl" />
        </button>
        <p className="text-xl font-semibold tracking-wider">Post</p>
      </div>

      <div className="pt-3">
        <PostDetails post={post} actualUser={actualUser} />
      </div>
      <PostReplies id={id} actualUser={actualUser} />
      <div className="h-96" />
    </section>
  );
};

export default SinglePost;
