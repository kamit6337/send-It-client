import { postState } from "@/redux/slice/postSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleMedia = ({ post }) => {
  const { updatePost, deletePost } = useSelector(postState);

  const newPost = useMemo(() => {
    if (updatePost.length === 0) return post;
    const findPost = updatePost.find((obj) => obj._id === post._id);
    if (findPost) {
      return findPost;
    } else {
      return post;
    }
  }, [post, updatePost]);

  const isDeleted = useMemo(() => {
    if (deletePost.includes(post._id)) {
      return true;
    }

    if (newPost.media === "") {
      return true;
    }

    return false;
  }, [deletePost, post._id, newPost.media]);

  if (isDeleted) return;

  const { _id, media, thumbnail, duration } = newPost;

  if (media.endsWith(".mp4")) {
    const givenSeconds = Math.floor(duration);
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
