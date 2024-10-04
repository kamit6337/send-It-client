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
import { useRef } from "react";
import usePostSaveToggle from "@/hooks/mutation/Save/usePostSaveToggle";
import useLoginCheck from "@/hooks/useLoginCheck";
import useIncreaseView from "@/hooks/mutation/View/useIncreaseView";
import {
  checkAlreadyView,
  setViewPostId,
} from "@/utils/javascript/checkAlreadyView";

type Props = {
  post: Post;
  user: User;
};

const LikeAndComment = ({ post, user }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { showErrorMessage, showSuccessMessage } = Toastify();
  const { data: actualUser } = useLoginCheck();

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the element is in view
    triggerOnce: true, // Only trigger once when it comes into view
    rootMargin: "500px 0px", // Trigger 100px before the element enters the viewport
  });

  const postId = post._id;

  const { data } = usePostDetails(postId, inView);
  const { mutate: mutateLike, isPending: isPendingLikeToggle } =
    usePostLikeToggle(actualUser, postId, user._id);
  const { mutate: mutateSave, isPending: isPendingSaveToggle } =
    usePostSaveToggle(actualUser, postId, user._id);

  const { mutate: mutatePostViewCount } = useIncreaseView(postId);

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

  const likeCount = data?.likeCount || 0;
  const saveCount = data?.saveCount || 0;
  const replyCount = data?.replyCount || 0;
  const viewCount = data?.viewCount || 0;
  const isLiked = data?.isLiked;
  const isSaved = data?.isSaved;

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
              disabled={isPendingLikeToggle}
              className="text-red-500 p-2 rounded-full"
              onClick={() => {
                mutateLike({ toggle: false, post });

                const check = checkAlreadyView(postId);
                if (!check) {
                  mutatePostViewCount();
                  setViewPostId(postId);
                }
              }}
            >
              <ReactIcons.heartSolid />
            </button>
          ) : (
            <button
              disabled={isPendingLikeToggle}
              onClick={() => {
                mutateLike({ toggle: true, post });
                const check = checkAlreadyView(postId);
                if (!check) {
                  mutatePostViewCount();
                  setViewPostId(postId);
                }
              }}
              className="hover:text-red-500 hover:bg-red-200 p-2 rounded-full"
            >
              <ReactIcons.heartOutline />
            </button>
          )}
          <p className="-ml-2 text-sm">{likeCount}</p>
        </div>

        {/* NOTE: VIEW COUNT */}

        <div className="flex items-center gap-1">
          <p>
            <ReactIcons.views />
          </p>
          <p className="text-sm">{viewCount}</p>
        </div>

        {/* NOTE: BOOKMARK */}
        <div className=" flex items-center gap-1">
          {isSaved ? (
            <button
              disabled={isPendingSaveToggle}
              onClick={() => {
                mutateSave({ toggle: false, post });

                const check = checkAlreadyView(postId);
                if (!check) {
                  mutatePostViewCount();
                  setViewPostId(postId);
                }
              }}
              className="text-blue-500 p-2 rounded-full"
            >
              <ReactIcons.bookmarkSolid />
            </button>
          ) : (
            <button
              disabled={isPendingSaveToggle}
              onClick={() => {
                mutateSave({ toggle: true, post });

                const check = checkAlreadyView(postId);
                if (!check) {
                  mutatePostViewCount();
                  setViewPostId(postId);
                }
              }}
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
