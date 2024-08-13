import useSinglePost from "@/hooks/useSinglePost";
import Loading from "@/lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import PostReplies from "./PostReplies";
import ReactIcons from "@/assets/icons";
import PostDetails from "./PostDetails";
import useLoginCheck from "@/hooks/useLoginCheck";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: actualUser } = useLoginCheck();

  const { isLoading, error, data } = useSinglePost(id as string);

  if (isLoading) {
    return (
      <div className="h-96 w-full">
        <Loading hScreen={false} small={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 w-full">
        <p>{error.message}</p>
      </div>
    );
  }

  const post = data.data;

  return (
    <section className="">
      <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
        <button className="left_arrow" onClick={() => navigate(-1)}>
          <ReactIcons.leftArrow className="text-xl" />
        </button>
        <p className="text-xl font-semibold tracking-wider">Post</p>
      </div>

      <div className="px-5 py-5">
        <PostDetails post={post} actualUser={actualUser} />
      </div>
      <PostReplies id={id} actualUser={actualUser} />
      <div className="h-96" />
    </section>
  );
};

export default SinglePost;
