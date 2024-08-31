import useSinglePost from "@/hooks/useSinglePost";
import Loading from "@/lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import PostReplies from "./PostReplies";
import ReactIcons from "@/assets/icons";
import PostDetails from "../../components/PostDetails";
import useLoginCheck from "@/hooks/useLoginCheck";
import { Params } from "@/types";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams() as Params;
  const { data: actualUser } = useLoginCheck();

  const { isLoading, error, data } = useSinglePost(id);

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

  const post = data;

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
