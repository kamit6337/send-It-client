import ReactIcons from "@/assets/icons";
import Loading from "@/lib/Loading";
import { useRef } from "react";

const MediaAndSubmit = ({ isLoading, selectedFile, handleCreate, title }) => {
  const fileRef = useRef<HTMLInputElement | undefined>(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    console.log(file);

    if (isImage && file.size < 1024 * 1024) {
      // Image file < 1 MB
      selectedFile(file);
    } else if (isVideo && file.size < 10 * 1024 * 1024) {
      // Video file < 10 MB
      selectedFile(file);
    } else {
      alert("File size must be less than 1 MB for images and 10 MB for videos");
    }
  };

  const openFile = () => {
    fileRef.current?.click();
  };

  return (
    <div className="flex items-center justify-between">
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
      <button
        disabled={isLoading}
        className="py-[6px] px-4 rounded-full bg-sky_blue text-white"
        onClick={handleCreate}
      >
        {isLoading ? <Loading hScreen={false} small={true} /> : title}
      </button>
    </div>
  );
};

export default MediaAndSubmit;
