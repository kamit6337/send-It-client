import ReactIcons from "@/assets/icons";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { POST, POST_DETAIL, USER } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import environment from "@/utils/environment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
// import CreatePostReply from "./CreatePostReply";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import {
  checkAlreadyView,
  setViewPostId,
} from "@/utils/javascript/checkAlreadyView";
import usePostDetails from "@/hooks/posts/usePostDetails";
import Loading from "@/lib/Loading";
import getGraphql from "@/utils/api/graphql";
import updatePostLikeSchema, {
  updatePostLikeDataQuery,
} from "@/graphql/like_and_save/updatePostLikeSchema";
import { useQueryClient } from "@tanstack/react-query";
import updatePostSaveSchema, {
  updatePostSaveDataQuery,
} from "@/graphql/like_and_save/updatePostSaveSchema";
import CreatePostReply from "./CreatePostReply";

type Props = {
  post: POST;
  user: USER;
};

const LikeAndComment = ({ post, user }: Props) => {
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { showErrorMessage, showSuccessMessage } = Toastify();
  const { data: actualUser } = useLoginCheck();
  const [isPending, setIsPending] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the element is in view
    triggerOnce: true, // Only trigger once when it comes into view
    rootMargin: "500px 0px", // Trigger 100px before the element enters the viewport
  });

  const postId = post._id;

  const { data, isLoading, error } = usePostDetails(postId, inView);

  if (isLoading) {
    return <Loading height={"full"} small={true} />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

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

  const handleTogglePostLike = async (toggle: boolean) => {
    try {
      setIsPending(true);

      const result = await getGraphql(
        updatePostLikeSchema,
        updatePostLikeDataQuery,
        { toggle, id: postId }
      );

      const checkStatus = queryClient.getQueryState(["post details", postId]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["post details", postId],
          (old: POST_DETAIL) => {
            if (result === "true") {
              return { ...old, isLiked: true };
            }

            if (result === "false") {
              return { ...old, isLiked: false };
            }
            return old;
          }
        );
      }
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleTogglePostSave = async (toggle: boolean) => {
    try {
      setIsPending(true);

      const result = await getGraphql(
        updatePostSaveSchema,
        updatePostSaveDataQuery,
        { toggle, id: postId }
      );

      const checkStatus = queryClient.getQueryState(["post details", postId]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["post details", postId],
          (old: POST_DETAIL) => {
            if (result === "true") {
              return { ...old, isSaved: true };
            }

            if (result === "false") {
              return { ...old, isSaved: false };
            }
            return old;
          }
        );
      }
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    } finally {
      setIsPending(false);
    }
  };

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
          <DialogContent className="top-[3%] p-0 translate-y-0 max-h-[500px] overflow-y-auto w-full max-w-2xl">
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
        <div className=" flex items-center gap-1 w-10">
          {isLiked ? (
            <button
              disabled={isPending}
              className="text-red-500 p-2 rounded-full"
              onClick={() => handleTogglePostLike(false)}
            >
              <ReactIcons.heartSolid />
            </button>
          ) : (
            <button
              disabled={isPending}
              onClick={() => handleTogglePostLike(true)}
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
        <div className=" flex items-center gap-1 w-10">
          {isSaved ? (
            <button
              disabled={isPending}
              onClick={() => handleTogglePostSave(false)}
              className="text-blue-500 p-2 rounded-full"
            >
              <ReactIcons.bookmarkSolid />
            </button>
          ) : (
            <button
              disabled={isPending}
              onClick={() => handleTogglePostSave(true)}
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
            <button className="text-grey flex items-center ">
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
