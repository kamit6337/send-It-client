import ReactIcons from "@/assets/icons";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { deleteReq, postReq } from "@/utils/api/api";
import { useEffect, useState } from "react";

type Props = {
  postId: string;
  like: boolean;
  likeCount: number;
};

const LikeAndComment = ({ postId, like, likeCount }: Props) => {
  const [isLiked, setIsLiked] = useState(like);
  const [count, setCount] = useState<number>(likeCount);
  const { showErrorMessage } = Toastify();

  useEffect(() => {
    setIsLiked(like);
    setCount(likeCount);
  }, [like, likeCount]);

  const handleCreateLike = async () => {
    try {
      await postReq("/user/like", { id: postId });
      setIsLiked(true);
      setCount((prev) => prev + 1);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleRemoveLike = async () => {
    try {
      await deleteReq("/user/like", { id: postId });
      setIsLiked(false);
      setCount((prev) => prev - 1);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center text-grey">
        <button>
          <ReactIcons.reply />
        </button>
        <div className="prevent-navigation flex items-center gap-1">
          {isLiked ? (
            <button
              className="text-red-500 p-2 rounded-full"
              onClick={handleRemoveLike}
            >
              <ReactIcons.heartSolid />
            </button>
          ) : (
            <button
              onClick={handleCreateLike}
              className="hover:text-red-500 hover:bg-red-200 p-2 rounded-full"
            >
              <ReactIcons.heartOutline />
            </button>
          )}
          <p className="text-sm -ml-2">{count}</p>
        </div>
        <button>
          <ReactIcons.views />
        </button>
        <button>
          <ReactIcons.bookMarkOutline />
        </button>
        <button>
          <ReactIcons.share />
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default LikeAndComment;
