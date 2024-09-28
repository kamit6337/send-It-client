import { Post, User } from "@/types";
import EditPost from "./EditPost";
import { DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useRef, useState } from "react";
import useDeletePost from "@/hooks/mutation/Post/useDeletePost";

type Props = {
  post: Post;
  actualUser: User;
  isReply?: boolean;
};

const PostOptions = ({ post, actualUser, isReply = false }: Props) => {
  const closeRef = useRef(null);
  const { showErrorMessage } = Toastify();
  const { mutate } = useDeletePost(actualUser, post._id);
  // State to manage whether Edit and Delete dialogs are open
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      mutate();
      // await deleteReq("/post", { id: post._id });
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    }
  };

  const handleClose = () => {
    closeRef.current?.click();
  };

  return (
    <>
      <DropdownMenuContent align="end" className="prevent-navigation w-60">
        <DialogTrigger className="w-full">
          <DropdownMenuItem className="w-full flex justify-center">
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem
          onClick={handleDelete}
          className="flex justify-center"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DialogContent className="top-[3%] translate-y-0 h-[500px] overflow-y-auto pb-0">
        <EditPost post={post} handleClose={handleClose} isReply={isReply} />
        <DialogClose ref={closeRef} asChild className="hidden">
          <button>Close</button>
        </DialogClose>
      </DialogContent>
      <ToastContainer />
    </>
  );
};

export default PostOptions;
