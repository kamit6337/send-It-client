import FullScreenImage from "./FullScreenImage";
import { Dialog, DialogTrigger } from "./ui/dialog";

const imageTypeList = ["png", "jpeg", "jpg"];

type Props = {
  message: string;
  media: string;
};

const ShowPostMessage = ({ message, media }: Props) => {
  const imageType = media.split(".").at(-1) as string;

  return (
    <div className="w-full">
      <p>{message}</p>

      {imageTypeList.includes(imageType) ? (
        <Dialog>
          <DialogTrigger className="prevent-navigation rounded-xl h-[500px] border border-div_border ">
            <img src={media} className="h-full object-cover rounded-xl" />
          </DialogTrigger>
          <FullScreenImage src={media} />
        </Dialog>
      ) : (
        ""
      )}

      {media.endsWith(".mp4") && (
        <video
          className="prevent-navigation bg-black h-96 w-full rounded-xl border border-div_border"
          controls
        >
          <source src={media} />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default ShowPostMessage;
