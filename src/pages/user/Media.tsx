import useUserMedia from "@/hooks/useUserMedia";
import Loading from "@/lib/Loading";
import { OutletContext, Post as PostType } from "@/types";
import { useOutletContext } from "react-router-dom";
import SingleMedia from "./SingleMedia";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Media = () => {
  const { user } = useOutletContext<OutletContext>();
  const { isLoading, error, data, fetchNextPage, isFetching } = useUserMedia(
    user._id
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      !isFetching && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

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

  if (data?.pages[0].length === 0) {
    return (
      <>
        <Helmet>
          <title>User Media</title>
          <meta name="discription" content="User Media page of this project" />
        </Helmet>
        <div className="h-96 flex justify-center items-center">
          You don't have any media
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Media</title>
        <meta name="discription" content="User Media page of this project" />
      </Helmet>
      <section>
        <div className="grid grid-cols-3 gap-1 p-1 justify-items-center">
          {data?.pages.map((page) => {
            return page.map((post: PostType) => {
              return <SingleMedia key={post._id} post={post} />;
            });
          })}
        </div>
        {isFetching && (
          <div className="h-96">
            <Loading hScreen={false} small={false} />
          </div>
        )}
        <div ref={ref} className="h-96" />
      </section>
    </>
  );
};

export default Media;
