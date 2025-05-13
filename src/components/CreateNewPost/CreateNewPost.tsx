import { USER } from "@/types";
import Toastify from "@/lib/Toastify";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import findVideoDuration from "@/utils/javascript/findVideoDuration";
// import uploadVideoAndThumbnail from "@/lib/uploadVideoAndThumbnail";
// import uploadToAWS from "@/lib/uploadToAWS";
import { postReq } from "@/utils/api/api";
import Loading from "@/lib/Loading";
import ReactIcons from "@/assets/icons";
import imageAndVideoSizeFilteration from "@/utils/javascript/ImageAndVideoSizeFilteration";
import uploadImageOrVideoForPost from "@/utils/upload/uploadImageOrVideoForPost";
import getGraphql from "@/utils/api/graphql";
import createPostSchema from "@/graphql/posts/createPostSchema";

type SelectedFile = File | null; // Define type for selectedFile

const CreateNewPost = ({
  user,
  handleClose,
  isOfReply = false,
  postId,
}: {
  user: USER;
  isOfReply?: boolean;
  handleClose: () => void;
  postId?: string;
}) => {
  const { showErrorMessage, showAlertMessage } = Toastify();
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const { photo, name } = user;
  const [isFocused, setIsFocused] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const maxLength = 200;

  const {
    register,
    getValues,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const messageLength = watch("message").length;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReturn = imageAndVideoSizeFilteration(file);

    if (fileReturn) {
      setSelectedFile(fileReturn);
    }
  };

  const onSubmit = async () => {
    try {
      const message = getValues().message;
      if (!message && !selectedFile) {
        showAlertMessage({ message: "Please write a message or add media" });
        return;
      }

      if (isOfReply) {
        const media = await uploadImageOrVideoForPost(selectedFile);
        const obj = { postId, message, media };
        await postReq("/reply", obj);
      } else {
        let media;
        let duration;
        let thumbnail;

        if (selectedFile) {
          if (selectedFile.type.startsWith("video/")) {
            duration = await findVideoDuration(selectedFile);
            // const { mediaUrl, thumbnailUrl } = await uploadVideoAndThumbnail(
            //   selectedFile
            // );

            media = "mediaUrl";
            thumbnail = "thumbnailUrl";
          } else {
            media = await uploadImageOrVideoForPost(selectedFile);
          }
        }

        const response = await getGraphql(createPostSchema, {
          message,
          media,
          duration,
          thumbnail,
        });

        console.log("response", response);

        // await postReq("/post", { message, media, duration, thumbnail });
      }

      handleClose();
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
    if (fileRef.current) {
      fileRef.current.value = ""; // ✅ this clears the file input correctly
      fileRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-6 pb-0">
      <div className="flex gap-3 mb-5 px-3 md:px-6">
        <div className="w-10">
          <img
            src={photo}
            alt={name}
            className="w-full object-cover rounded-full"
          />
        </div>

        <textarea
          {...register("message")}
          placeholder="What is happening?!"
          className="bg-inherit w-full resize-none p-3 border rounded"
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          rows={isFocused ? 4 : 1}
        />
      </div>
      {selectedFile && (
        <div className="w-full relative my-3 px-3 md:px-6">
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full object-cover rounded-xl border border-border"
              alt="Selected Image"
            />
          ) : (
            <video
              key={selectedFile.name} // Use file name as the key to force re-render
              className="w-full rounded-xl border border-border"
              controls
            >
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
              Your browser does not support the video tag.
            </video>
          )}

          {/* MARK: EDIT AND CANCEL */}
          <div className="absolute z-10 top-0 left-0 w-full flex justify-between items-center py-4 px-10 ">
            <button
              type="button"
              className="bg-search_bg px-3 py-2 rounded-full"
              onClick={openFile}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-red-500 p-1 rounded-full border border-red-500"
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <ReactIcons.cancel className="text-2xl" />
            </button>
          </div>
        </div>
      )}

      {/* MARK: FOOTER */}
      <div className="flex items-center justify-between border-t border-sky_blue py-2 sticky bottom-0 bg-background px-2 md:px-5">
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
            <div className="text-xs text-sky_blue size-9 flex items-center justify-center border border-sky_blue rounded-full">
              {maxLength - messageLength}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-sky_blue py-2 px-6 rounded-full  text-white`}
          >
            {isSubmitting ? (
              <Loading height={"full"} small={true} />
            ) : isOfReply ? (
              "Reply"
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>

      {/* MARK: INPUT FILE SELECTION */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </form>
  );
};

export default CreateNewPost;
