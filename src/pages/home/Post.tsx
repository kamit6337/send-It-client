import ReactIcons from "@/assets/icons";
import FullScreenImage from "@/components/FullScreenImage";
import PostOptions from "@/components/PostOptions";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLoginCheck from "@/hooks/useLoginCheck";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";

const imageType = ["png", "jpeg", "jpg"];

const Post = ({ post, handleCreateLike, isLiked, handleRemoveLike }) => {
  const { data: user } = useLoginCheck();

  const {
    _id,
    user: { username, name, photo },
    message,
    media,
    updatedAt,
    likeCount,
    createdAt,
  } = post;

  return (
    <>
      <div className="border-b border-border w-full px-5 py-2 flex gap-5">
        <div className="w-9 md:w-10">
          <img src={photo} alt={name} className="w-full rounded-full" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white text-sm">{name}</p>
              <div className="flex items-center">
                <p className="text-grey text-sm">@{username}</p>
                <p className="text-grey">
                  <ReactIcons.dot />
                </p>
                <p className="text-grey text-sm">
                  {formatRelativeDate(updatedAt)}
                </p>
              </div>
            </div>

            {username === user.username && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="text-grey">
                    <ReactIcons.threeDot />
                  </button>
                </DropdownMenuTrigger>
                <PostOptions />
              </DropdownMenu>
            )}
          </div>
          <p>{message}</p>

          {imageType.includes(media.split(".").at(-1)) && (
            <Dialog>
              <DialogTrigger>
                <div className="rounded-md h-96 flex justify-center border border-border">
                  <img src={media} className="h-full object-cover rounded-md" />
                </div>
              </DialogTrigger>
              <FullScreenImage src={media} />
            </Dialog>
          )}

          <div className="w-full flex justify-between items-center text-grey mt-2">
            <button>
              <ReactIcons.reply />
            </button>
            <div className="flex items-center gap-1">
              {isLiked ? (
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveLike(_id)}
                >
                  <ReactIcons.heartSolid />
                </button>
              ) : (
                <button onClick={() => handleCreateLike(_id)}>
                  <ReactIcons.heartOutline />
                </button>
              )}
              <p className="text-sm">{likeCount}</p>
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
        </div>
      </div>
    </>
  );
};

export default Post;
