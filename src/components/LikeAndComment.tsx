import ReactIcons from "@/assets/icons";
import {
  offNewLike,
  offNewSave,
  offRemoveLike,
  offRemoveSave,
  onNewLike,
  onNewSave,
  onRemoveLike,
  onRemoveSave,
} from "@/lib/socketIO";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { Like, Save } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { useEffect, useState } from "react";

type Props = {
  postId: string;
  like: boolean;
  likeCount: number;
  save: boolean;
  saveCount: number;
};

const LikeAndComment = ({
  postId,
  like,
  likeCount,
  save,
  saveCount,
}: Props) => {
  const [isLiked, setIsLiked] = useState(like);
  const [isSaved, setIsSaved] = useState(save);
  const [increaseLike, setIncreaseLike] = useState<Like[]>([]);
  const [decreaseLike, setDecreaseLike] = useState<Like[]>([]);
  const [increaseSave, setIncreaseSave] = useState<Save[]>([]);
  const [decreaseSave, setDecreaseSave] = useState<Save[]>([]);
  const { showErrorMessage } = Toastify();

  useEffect(() => {
    setIsLiked(like);
  }, [like]);

  useEffect(() => {
    setIsSaved(save);
  }, [save]);

  useEffect(() => {
    const handleNewLike = (response: Like) => {
      if (postId === response.post) {
        setIncreaseLike((prev) => generateUniqueIDArray([response, ...prev]));
      }
    };
    onNewLike(handleNewLike);
    return () => {
      offNewLike(handleNewLike);
    };
  }, [postId]);

  useEffect(() => {
    const handleRemoveLike = (response: Like) => {
      if (postId === response.post) {
        setDecreaseLike((prev) => generateUniqueIDArray([response, ...prev]));
      }
    };
    onRemoveLike(handleRemoveLike);
    return () => {
      offRemoveLike(handleRemoveLike);
    };
  }, [postId]);

  useEffect(() => {
    const handleNewSave = (response: Save) => {
      if (postId === response.post) {
        setIncreaseSave((prev) => generateUniqueIDArray([response, ...prev]));
      }
    };
    onNewSave(handleNewSave);
    return () => {
      offNewSave(handleNewSave);
    };
  }, [postId]);

  useEffect(() => {
    const handleRemoveSave = (response: Save) => {
      if (postId === response.post) {
        setDecreaseSave((prev) => generateUniqueIDArray([response, ...prev]));
      }
    };
    onRemoveSave(handleRemoveSave);

    return () => {
      offRemoveSave(handleRemoveSave);
    };
  }, [postId]);

  const handleCreateLike = async () => {
    try {
      await postReq("/like", { id: postId });
      setIsLiked(true);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleCreateSave = async () => {
    try {
      await postReq("/save", { id: postId });
      setIsSaved(true);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleRemoveLike = async () => {
    try {
      await deleteReq("/like", { id: postId });
      setIsLiked(false);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleRemoveSave = async () => {
    try {
      await deleteReq("/save", { id: postId });
      setIsSaved(false);
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

        {/* NOTE: LIKE */}
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
          <p className="text-sm -ml-2">
            {likeCount + increaseLike.length - decreaseLike.length}
          </p>
        </div>
        <button>
          <ReactIcons.views />
        </button>

        {/* NOTE: BOOKMARK */}
        <div className="prevent-navigation flex items-center gap-1">
          {isSaved ? (
            <button
              className="text-blue-500 p-2 rounded-full"
              onClick={handleRemoveSave}
            >
              <ReactIcons.bookmarkSolid />
            </button>
          ) : (
            <button
              onClick={handleCreateSave}
              className="hover:text-blue-500 hover:bg-blue-200 p-2 rounded-full"
            >
              <ReactIcons.bookMarkOutline />
            </button>
          )}
          <p className="text-sm -ml-2">
            {saveCount + increaseSave.length - decreaseSave.length}
          </p>
        </div>

        <button>
          <ReactIcons.share />
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default LikeAndComment;
