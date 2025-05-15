import { POST, USER } from "@/types";
// import EditPost from "./EditPost";
import { DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useEffect, useRef, useState } from "react";
// import useDeletePost from "@/hooks/mutation/Post/useDeletePost";

type Props = {
  post: POST;
  actualUser: USER;
  isReply?: boolean;
};

const PostOptions = ({ post, actualUser, isReply = false }: Props) => {
  const closeRef = useRef(null);
  const deleteRef = useRef(null);
  const { showErrorMessage } = Toastify();
  // const { mutate } = useDeletePost(actualUser, post._id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (deleteDialogOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling again
    }

    // Cleanup when the component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [deleteDialogOpen]);

  const handleCloseDelete = (e) => {
    // Check if the click happened outside the delete dialog
    if (deleteRef.current && !deleteRef.current.contains(e.target as Node)) {
      setDeleteDialogOpen(false); // Close the dialog
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteDialogOpen(false);
      // mutate();
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
          // onClick={handleDelete}
          onClick={() => setDeleteDialogOpen(true)}
          className="flex justify-center"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DialogContent className="top-[3%] translate-y-0 max-h-[500px] overflow-y-auto pb-0">
        {/* <EditPost post={post} handleClose={handleClose} isReply={isReply} /> */}
        Edit post
        <DialogClose ref={closeRef} asChild className="hidden">
          <button>Close</button>
        </DialogClose>
      </DialogContent>

      {deleteDialogOpen && (
        <div
          onClick={handleCloseDelete}
          className="fixed top-0 left-0 z-50 w-full h-screen backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center"
        >
          <div
            ref={deleteRef}
            className="bg-background border border-div_border rounded-md p-[2px] w-72 flex flex-col items-center gap-5 pb-20 pt-12 px-5"
          >
            <p className="text-xl font-semibold tracking-wide">Delete Post?</p>
            <p className="text-sm text-grey">
              Once the post deleted. It can't be restored.
            </p>
            <button
              className="w-full flex justify-center py-3 rounded-full bg-red-500 text-white hover:brightness-95"
              onClick={handleDelete}
            >
              Delete
            </button>
            <p
              className="w-full flex justify-center py-3 rounded-full border border-div_border cursor-pointer hover:brightness-75"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostOptions;
