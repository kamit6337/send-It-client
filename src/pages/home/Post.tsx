import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { postReq } from "@/utils/api/api";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Post = () => {
  const fileRef = useRef<HTMLInputElement | undefined>(null);
  const [imageSelected, setImageSelected] = useState(null);
  const { data: user } = useLoginCheck();
  const { showErrorMessage, showAlertMessage } = Toastify();

  const { register, getValues, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleCreatePost = async () => {
    try {
      const message = getValues().message;
      if (!message && !imageSelected) {
        showAlertMessage({ message: "Please write a message or add media" });
        return;
      }
      const post = await postReq("/post", { message });
      reset();
      setImageSelected(null);
      console.log("post", post);
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
      <div className="border-b border-border w-full p-5 pb-0 flex">
        <div className="w-9 md:w-12">
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
            className="bg-inherit px-5 w-full resize-none"
            maxLength={200}
          />
          {imageSelected && (
            <div className="w-full relative rounded-xl">
              <img
                src={URL.createObjectURL(imageSelected)}
                className="w-full object-cover rounded-xl px-5"
              />
              <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center px-5 ">
                <button
                  className="bg-search_bg m-3 px-3 py-2 rounded-full"
                  onClick={openFile}
                >
                  Edit
                </button>
                <button
                  className="text-search_bg m-3"
                  onClick={() => setImageSelected(null)}
                >
                  <ReactIcons.cancel className="text-4xl" />
                </button>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 space-y-3 bg-background pb-5 pt-2">
            <p className="text-sky_blue px-5 border-b border-border pb-2">
              Everyone can reply
            </p>
            <div className="flex items-center justify-between pl-5">
              <p className="cursor-pointer" onClick={openFile}>
                <ReactIcons.media className="text-sky_blue" />
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImageSelected(file);
                }}
              />
              <button
                className="py-2 px-4 rounded-full bg-sky_blue"
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

export default Post;
