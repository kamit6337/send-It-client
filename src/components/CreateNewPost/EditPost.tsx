import { POST } from "@/types";
import Toastify from "@/lib/Toastify";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "@/lib/Loading";
import ReactIcons from "@/assets/icons";
import imageAndVideoSizeFilteration from "@/utils/javascript/imageAndVideoSizeFilteration";
import uploadImageOrVideoForPost from "@/utils/upload/uploadImageOrVideoForPost";
import getGraphql from "@/utils/api/graphql";
import EditAndCancel from "./EditAndCancel";
import updatePostSchema, {
  updatePostDataQuery,
} from "@/graphql/posts/updatePostSchema";

type SelectedFile = File | null; // Define type for selectedFile

type Props = {
  post: POST;
  handleClose: () => void;
};

type FormDataType = {
  message: string;
};

const EditPost = ({ handleClose, post }: Props) => {
  const { showErrorMessage, showAlertMessage } = Toastify();
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [defaultMedia, setDefaultMedia] = useState<string | null>(null);
  const { photo, name } = post.user;
  const [isFocused, setIsFocused] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const maxLength = 200;

  const { _id: postId, message, media } = post;
  const {
    register,
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

  useEffect(() => {
    if (postId) {
      reset({ message });
      setDefaultMedia(media);
    }
  }, [postId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReturn = imageAndVideoSizeFilteration(file);

    if (fileReturn) {
      setSelectedFile(fileReturn);
      setDefaultMedia(null);
    }
  };

  const onSubmit = async (data: FormDataType) => {
    try {
      if (message === data.message && defaultMedia) {
        showAlertMessage({
          message: "Please update Message or Media to Update",
        });
        return;
      }

      if (!data.message && !selectedFile) {
        showAlertMessage({
          message: "Please write Message or select Media to Update",
        });
        return;
      }

      const { duration, media, thumbnail } = await uploadImageOrVideoForPost(
        selectedFile
      );

      await getGraphql(updatePostSchema, updatePostDataQuery, {
        id: postId,
        message: data.message,
        media: selectedFile ? media : post.media,
        duration: selectedFile ? duration : post.duration,
        thumbnail: selectedFile ? thumbnail : post.thumbnail,
      });

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

  const handleCancelSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`pt-10 pb-0 `}>
      <div className="flex justify-between gap-3 px-3 md:px-6">
        <div className="w-10 grow-0 shrink-0">
          <img
            src={photo}
            alt={name}
            className="w-full object-cover rounded-full"
          />
        </div>

        <div className="flex-1 gap-3 mb-5">
          <div>
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
            <EditAndCancel
              selectedFile={selectedFile}
              openFile={openFile}
              handleCancel={handleCancelSelectedFile}
            />
          )}
          {defaultMedia && (
            <div className="w-full relative my-3">
              {defaultMedia.endsWith(".mp4") ? (
                <video
                  preload="metadata"
                  className="w-full rounded-xl border border-border"
                  controls
                >
                  <source src={defaultMedia} type={"video/mp4"} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={defaultMedia}
                  className="w-full object-cover rounded-xl border border-border"
                  alt="Selected Image"
                />
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
                  onClick={() => setDefaultMedia(null)}
                >
                  <ReactIcons.cancel className="text-2xl" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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
            {isSubmitting ? <Loading height={"full"} small={true} /> : "Submit"}
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

export default EditPost;
