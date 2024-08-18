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
import { Like, Post, Save, User } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import generateUniqueIDArray from "@/utils/javascript/generateUniqueIDArray";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import environment from "@/utils/environment";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import CreatePostReply from "./CreatePostReply";

type Props = {
  post: Post;
  user: User;
  postId: string;
  like: boolean;
  likeCount: number;
  save: boolean;
  saveCount: number;
  replyCount: number;
};

const LikeAndComment = ({
  post,
  user,
  postId,
  like,
  likeCount,
  save,
  saveCount,
  replyCount,
}: Props) => {
  const closeRef = useRef(null);
  const [isLiked, setIsLiked] = useState(like);
  const [isSaved, setIsSaved] = useState(save);
  const [increaseLike, setIncreaseLike] = useState<Like[]>([]);
  const [decreaseLike, setDecreaseLike] = useState<Like[]>([]);
  const [increaseSave, setIncreaseSave] = useState<Save[]>([]);
  const [decreaseSave, setDecreaseSave] = useState<Save[]>([]);
  const { showErrorMessage, showSuccessMessage } = Toastify();

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

  const handleCopyLink = () => {
    const link = `${environment.CLIENT_URL}/posts/${postId}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        showSuccessMessage({
          message: "Copied to Clipboard",
        });
      })
      .catch((error) => {
        showErrorMessage({
          message: "Unable to copy link to clipboard",
        });
        console.error("Error copying text: ", error);
      });
  };

  const handleClose = () => {
    closeRef.current?.click();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center text-grey">
        {/* NOTE: REPLY */}
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center">
              <button className="hover:text-sky-500 hover:bg-sky-200 p-2 rounded-full">
                <ReactIcons.reply />
              </button>
              <p className="-ml-1 text-sm">{replyCount}</p>
            </div>
          </DialogTrigger>
          <DialogContent className="top-[3%] translate-y-0 max-h-[500px] overflow-y-auto">
            <CreatePostReply
              post={post}
              user={user}
              handleClose={handleClose}
            />
            <DialogClose ref={closeRef} asChild className="hidden">
              <button>close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* NOTE: LIKE */}
        <div className=" flex items-center gap-1">
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
          <p className="-ml-2 text-sm">
            {likeCount + increaseLike.length - decreaseLike.length}
          </p>
        </div>
        <button>
          <ReactIcons.views />
        </button>

        {/* NOTE: BOOKMARK */}
        <div className=" flex items-center gap-1">
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

        {/* NOTE: SHARE */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="text-grey ">
              <ReactIcons.share />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" w-40">
            <DropdownMenuItem
              className="flex justify-center"
              onClick={handleCopyLink}
            >
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ToastContainer />
    </>
  );
};

export default LikeAndComment;
