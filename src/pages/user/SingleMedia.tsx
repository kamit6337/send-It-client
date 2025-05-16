import { addToPost, postState } from "@/redux/slice/postSlice";
import { POST } from "@/types";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  post: POST;
};

const SingleMedia = ({ post }: Props) => {
  const { updatePosts, deletePostIds } = useSelector(postState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post._id) {
      dispatch(addToPost(post._id));
    }
  }, [post._id, dispatch]);

  const newPost = useMemo(() => {
    const isDeleted = deletePostIds.includes(post._id);

    if (isDeleted) return null;

    const findPost = updatePosts.find((obj: POST) => obj._id === post._id);
    if (findPost) {
      return findPost;
    } else {
      return post;
    }
  }, [post, updatePosts, deletePostIds]);

  if (!newPost) return;

  const { _id, media, thumbnail, duration } = newPost;

  if (media.endsWith(".mp4")) {
    let givenSeconds = 0;

    if (duration) {
      givenSeconds = Math.floor(duration);
    }
    const seconds = givenSeconds % 60;
    const minutes = Math.floor(givenSeconds / 60);

    return (
      <div key={_id} className="w-full relative">
        <Link to={`/posts/${_id}`}>
          <img src={thumbnail} className="w-full object-cover" />
          <div className="absolute z-10 bottom-0 left-0 flex text-white mb-2 ml-2 bg-black py-1 px-2 rounded-full text-sm">
            <p>{minutes}</p>
            <p>:</p>
            <p>{seconds}</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div key={_id} className="w-full">
      <Link to={`/posts/${_id}`}>
        <img src={media} className="w-full object-cover" />
      </Link>
    </div>
  );
};

export default SingleMedia;
