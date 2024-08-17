import { Post, User } from "@/types";
import ShowPostMessage from "./ShowPostMessage";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";
import ReactIcons from "@/assets/icons";
import CreateNewPost from "./CreateNewPost";

type Props = {
  post: Post;
  user: User;
  handleClose: () => void;
};

const CreatePostReply = ({ post, user, handleClose }: Props) => {
  const {
    _id: postId,
    user: { _id, name, username, photo },
    message,
    media,
    createdAt,
    likeCount,
    isLiked,
    isSaved,
    saveCount = 0,
  } = post;

  return (
    <section className="space-y-2">
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-9 md:w-10" onClick={(e) => e.stopPropagation()}>
            <img
              src={photo}
              alt={name}
              className="w-full rounded-full"
              loading="lazy"
            />
          </div>
          <div className="h-full w-[2px] bg-div_border" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-user_name text-sm hover:underline underline-offset-4">
                {name}
              </p>
              <div className="flex items-center">
                <p className="text-grey text-sm">@{username}</p>
                <p className="text-grey">
                  <ReactIcons.dot />
                </p>
                <p className="text-grey text-sm">
                  {formatRelativeDate(createdAt)}
                </p>
              </div>
            </div>
          </div>
          <ShowPostMessage media={media} message={message} />
        </div>
      </div>
      {/* NOTE: ACTUAL USER */}
      <div>
        <CreateNewPost
          user={user}
          handleClose={handleClose}
          isOfReply={true}
          postId={postId}
        />
      </div>
    </section>
  );
};

export default CreatePostReply;
