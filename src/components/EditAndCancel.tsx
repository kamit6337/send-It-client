import ReactIcons from "@/assets/icons";
import { ChangeEvent, useRef } from "react";

type Props = {
  selectedFile: (value: File | null) => void;
};

const EditAndCancel = ({ selectedFile }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage && file.size < 1024 * 1024) {
      // Image file < 1 MB
      selectedFile(file);
    } else if (isVideo && file.size < 10 * 1024 * 1024) {
      // Video file < 10 MB

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
    <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center px-2 ">
      <button
        className="bg-search_bg m-3 px-3 py-2 rounded-full"
        onClick={openFile}
      >
        Edit
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        className="text-foreground m-3"
        onClick={() => selectedFile(null)}
      >
        <ReactIcons.cancel className="text-4xl" />
      </button>
    </div>
  );
};

export default EditAndCancel;
