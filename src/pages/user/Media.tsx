import useUserMedia from "@/hooks/useUserMedia";
import Loading from "@/lib/Loading";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { type Post as PostType } from "@/types";
import { Link } from "react-router-dom";

const imageTypeList = ["png", "jpeg", "jpg"];

const Media = () => {
  const { username } = useParams();
  const { user } = useOutletContext();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const { isLoading, error, data } = useUserMedia(user._id, page);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setPosts(data.data);
        return;
      }
      setPosts((prev) => [...data.data, ...prev]);
    }
  }, [data, page]);

  if (isLoading) {
    return (
      <div className="h-96 w-full">
        <Loading hScreen={false} small={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 w-full">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-1 p-1 justify-items-center">
        {posts.map((post: Post) => {
          const { _id, media, thumbnail, duration } = post;

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
        })}
      </div>
      <div className="h-96" />
    </section>
  );
};

export default Media;
