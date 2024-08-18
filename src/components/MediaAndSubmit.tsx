import ReactIcons from "@/assets/icons";
import Loading from "@/lib/Loading";
import { useRef } from "react";

type Props = {
  isLoading: boolean;
  selectedFile: (File: File) => void;
  handleCreate: () => void;
  title: string;
  maxLength: number;
  messageLength: number;
  isFocused?: boolean;
};

const MediaAndSubmit = ({
  isLoading,
  selectedFile,
  handleCreate,
  title,
  messageLength,
  maxLength,
  isFocused = false,
}: Props) => {
  const fileRef = useRef<HTMLInputElement | undefined>(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage && file.size < 1024 * 1024) {
      selectedFile(file);
    } else if (isVideo && file.size < 10 * 1024 * 1024) {
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.src = URL.createObjectURL(file);
      // This function will be triggered when the video metadata is loaded
      videoElement.onloadedmetadata = () => {
        // Set the video duration in seconds
        console.log("video duration", videoElement.duration);
        selectedFile(file);
      };
    } else {
      alert("File size must be less than 1 MB for images and 10 MB for videos");
    }
  };

  const openFile = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex items-center justify-between border-t border-sky_blue pt-2">
      <p className="cursor-pointer" onClick={openFile}>
        <ReactIcons.media className="text-sky_blue" />
      </p>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex items-center gap-3">
        {isFocused && (
          <div className="text-xs text-sky_blue p-2 border border-sky_blue rounded-full">
            {maxLength - messageLength}
          </div>
        )}
        <button
          disabled={isLoading}
          className={`${
            isFocused ? "bg-sky_blue" : "bg-sky-300"
          }  py-[6px] px-4 rounded-full  text-white`}
          onClick={handleCreate}
        >
          {isLoading ? <Loading hScreen={false} small={true} /> : title}
        </button>
      </div>
    </div>
  );
};

export default MediaAndSubmit;
