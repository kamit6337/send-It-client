import { POST } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Toastify from "@/lib/Toastify";
import { useEffect, useRef, useState } from "react";
import EditPost from "../CreateNewPost/EditPost";
import ReactIcons from "@/assets/icons";

type Props = {
  post: POST;
};

const PostOptions = ({ post }: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { showErrorMessage } = Toastify();
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
      <div onClick={(e) => e.stopPropagation()}>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-grey p-2 hover:bg-gray-300 hover:rounded-full">
              <ReactIcons.threeDot />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="prevent-navigation w-60"
            >
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
          </DropdownMenu>

          <DialogContent className="top-[3%] translate-y-0 max-h-[500px] overflow-y-auto p-0  max-w-2xl w-full">
            <EditPost post={post} handleClose={handleClose} />
            <DialogClose ref={closeRef} asChild className="hidden">
              <button>Close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {deleteDialogOpen && (
          <div className="fixed top-0 left-0 z-50 w-full h-screen backdrop-blur-sm backdrop-brightness-75 flex justify-center items-center">
            <div className="bg-background border border-div_border rounded-md p-[2px] w-72 flex flex-col items-center gap-5 pb-20 pt-12 px-5">
              <p className="text-xl font-semibold tracking-wide">
                Delete Post?
              </p>
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
      </div>
    </>
  );
};

export default PostOptions;
