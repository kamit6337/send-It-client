import ReactIcons from "@/assets/icons";
import { useRef } from "react";

const EditAndCancel = ({ selectedFile }) => {
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
