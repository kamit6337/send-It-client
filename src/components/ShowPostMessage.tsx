import { useState } from "react";

const imageTypeList = ["png", "jpeg", "jpg"];

type Props = {
  message: string;
  media: string;
};

const ShowPostMessage = ({ message, media }: Props) => {
  const imageType = media.split(".").at(-1) as string;
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleShowFullImage = (e) => {
    e.stopPropagation();
    setIsFullScreen(true);
    // dispatch(toggleFullImage({ bool: true, data: media }));
    document.body.style.overflow = "hidden"; // Prevent scrolling when full image is open
  };

  const handleCloseFullImage = (e) => {
    e.stopPropagation();
    setIsFullScreen(false);
    document.body.style.overflow = "auto"; // Enable scrolling when full image is closed
  };

  return (
    <div className="w-full">
      <p className="mb-5">{message}</p>

      {imageTypeList.includes(imageType) ? (
        <div
          className="rounded-xl w-max h-[500px] border border-div_border"
          onClick={handleShowFullImage}
        >
          <img src={media} className="h-full object-cover rounded-xl" />
        </div>
      ) : (
        // <Dialog>
        //   <DialogTrigger className="prevent-navigation rounded-xl h-[500px] border border-div_border ">
        //     <img
        //       src={media}
        //       className="h-full object-cover rounded-xl prevent-navigation"
        //     />
        //   </DialogTrigger>
        //   <FullScreenImage src={media} />
        // </Dialog>
        ""
      )}

      {media.endsWith(".mp4") && (
        <video
          className="bg-black h-96 w-full rounded-xl border border-div_border"
          onClick={(e) => e.stopPropagation()}
          controls
        >
          <source src={media} />
          Your browser does not support the video tag.
        </video>
      )}
      {isFullScreen && (
        <div
          className="fixed z-50 top-0 left-0 h-screen w-full flex justify-center items-center backdrop-blur-md bg-gray-100/50"
          onClick={handleCloseFullImage}
        >
          <img
            src={media}
            alt={media}
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          />
        </div>
      )}
    </div>
  );
};

export default ShowPostMessage;
