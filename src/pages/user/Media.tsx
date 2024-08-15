import useUserMedia from "@/hooks/useUserMedia";
import Loading from "@/lib/Loading";
import { Post } from "@/types";
import { useOutletContext, useParams } from "react-router-dom";

const imageTypeList = ["png", "jpeg", "jpg"];

const Media = () => {
  const { username } = useParams();
  const { user } = useOutletContext();
  const { isLoading, error, data } = useUserMedia(user._id);

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

  const posts = data.data;

  return (
    <section>
      <div className="grid grid-cols-3 gap-1 p-1">
        {posts.map((post: Post) => {
          const { _id, media } = post;

          const imageType = media.split(".").at(-1) as string;

          if (imageTypeList.includes(imageType)) {
            return (
              <div key={_id} className="h-full">
                <img src={media} className="h-full object-cover" />
              </div>
            );
          }

          if (media.endsWith(".mp4")) {
            return (
              <video key={_id} className="prevent-navigation w-full" controls>
                <source src={media} />
                Your browser does not support the video tag.
              </video>
            );
          }

          return <p>Nothing</p>;
        })}
      </div>
      <div className="h-96" />
    </section>
  );
};

export default Media;
