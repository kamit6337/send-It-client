import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import uploadToAWS from "@/lib/uploadToAWS";
import { postReq } from "@/utils/api/api";
import environment from "@/utils/environment";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

type SelectedFile = {
  type: string;
};

const CreatePost = ({ addNewPost }) => {
  const fileRef = useRef<HTMLInputElement | undefined>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const { data: user } = useLoginCheck();
  const { showErrorMessage, showAlertMessage } = Toastify();

  const { register, getValues, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    console.log(file);

    if (isImage && file.size < 1024 * 1024) {
      // Image file < 1 MB
      setSelectedFile(file);
    } else if (isVideo && file.size < 10 * 1024 * 1024) {
      // Video file < 10 MB
      setSelectedFile(file);
    } else {
      alert("File size must be less than 1 MB for images and 10 MB for videos");
    }
  };

  const handleCreatePost = async () => {
    try {
      const message = getValues().message;
      if (!message && !selectedFile) {
        showAlertMessage({ message: "Please write a message or add media" });
        return;
      }

      let media;

      if (selectedFile) {
        media = await uploadToAWS(selectedFile);
      }

      const response = await postReq("/post", { message, media });
      addNewPost(response.data);
      reset();
      setSelectedFile(null);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
  };

  const openFile = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div className="border-b border-border w-full p-5 pb-0 flex gap-5">
        <div className="w-9 md:w-10">
          <img
            src={user.photo}
            alt={user.name}
            className="w-full rounded-full"
          />
        </div>
        <div className="w-full space-y-3">
          <textarea
            {...register("message")}
            placeholder="What is happening?!"
            className="bg-inherit w-full resize-none"
            maxLength={200}
          />
          {selectedFile && (
            <div className="w-full relative rounded-xl">
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  className="w-full object-cover rounded-xl"
                  alt="Selected Image"
                />
              ) : (
                <video className="w-full rounded-xl" controls>
                  <source
                    src={URL.createObjectURL(selectedFile)}
                    type={selectedFile.type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center px-5 ">
                <button
                  className="bg-search_bg m-3 px-3 py-2 rounded-full"
                  onClick={openFile}
                >
                  Edit
                </button>
                <button
                  className="text-search_bg m-3"
                  onClick={() => setSelectedFile(null)}
                >
                  <ReactIcons.cancel className="text-4xl" />
                </button>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 space-y-3 bg-background py-2">
            <p className="text-sky_blue border-b border-border pb-2">
              Everyone can reply
            </p>
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
                className="py-[6px] px-4 rounded-full bg-sky_blue"
                onClick={handleCreatePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
