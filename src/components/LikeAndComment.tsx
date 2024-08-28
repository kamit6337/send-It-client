import ReactIcons from "@/assets/icons";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { Post, User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import environment from "@/utils/environment";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import CreatePostReply from "./CreatePostReply";
import { useInView } from "react-intersection-observer";
import usePostDetails from "@/hooks/usePostDetails";
import usePostLikeToggle from "@/hooks/mutation/Like/usePostLikeToggle";
import useLikeAndCommentSocket from "@/hooks/generals/useLikeAndCommentSocket";
import { useRef } from "react";
import usePostSaveToggle from "@/hooks/mutation/Save/usePostSaveToggle";

type Props = {
  post: Post;
  user: User;
};

const LikeAndComment = ({ post, user }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the element is in view
    triggerOnce: true, // Only trigger once when it comes into view
    rootMargin: "500px 0px", // Trigger 100px before the element enters the viewport
  });

  const postId = post._id;
  useLikeAndCommentSocket(postId);

  const { data } = usePostDetails(postId, inView);
  const { mutate: mutateLike } = usePostLikeToggle(postId);
  const { mutate: mutateSave } = usePostSaveToggle(postId);

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

  const likeCount = data?.data?.likeCount || 0;
  const saveCount = data?.data?.saveCount || 0;
  const replyCount = data?.data?.replyCount || 0;
  const isLiked = data?.data?.isLiked;
  const isSaved = data?.data?.isSaved || 0;
  // const isReply = data?.data?.isReply || 0;

  return (
    <>
      <div
        ref={ref}
        className="w-full flex justify-between items-center text-grey"
      >
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
              onClick={() => mutateLike(false)}
            >
              <ReactIcons.heartSolid />
            </button>
          ) : (
            <button
              onClick={() => mutateLike(true)}
              className="hover:text-red-500 hover:bg-red-200 p-2 rounded-full"
            >
              <ReactIcons.heartOutline />
            </button>
          )}
          <p className="-ml-2 text-sm">{likeCount}</p>
        </div>
        <button>
          <ReactIcons.views />
        </button>

        {/* NOTE: BOOKMARK */}
        <div className=" flex items-center gap-1">
          {isSaved ? (
            <button
              onClick={() => mutateSave(false)}
              className="text-blue-500 p-2 rounded-full"
            >
              <ReactIcons.bookmarkSolid />
            </button>
          ) : (
            <button
              onClick={() => mutateSave(true)}
              className="hover:text-blue-500 hover:bg-blue-200 p-2 rounded-full"
            >
              <ReactIcons.bookMarkOutline />
            </button>
          )}
          <p className="text-sm -ml-2">{saveCount}</p>
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
