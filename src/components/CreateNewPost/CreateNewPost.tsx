import { USER } from "@/types";
import Toastify from "@/lib/Toastify";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "@/lib/Loading";
import ReactIcons from "@/assets/icons";
import imageAndVideoSizeFilteration from "@/utils/javascript/imageAndVideoSizeFilteration";
import uploadImageOrVideoForPost from "@/utils/upload/uploadImageOrVideoForPost";
import getGraphql from "@/utils/api/graphql";
import createPostSchema, {
  createPostDataQuery,
} from "@/graphql/posts/createPostSchema";
import createPostReplySchema, {
  createPostReplyDataQuery,
} from "@/graphql/reply/createPostReplySchema";
import EditAndCancel from "./EditAndCancel";

type SelectedFile = File | null; // Define type for selectedFile

type Props = {
  user: USER;
  isOfReply?: boolean;
  handleClose: () => void;
  postId?: string;
};

const CreateNewPost = ({
  user,
  handleClose,
  isOfReply = false,
  postId,
}: Props) => {
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

      const { duration, media, thumbnail } = await uploadImageOrVideoForPost(
        selectedFile
      );
      const obj = {
        postId,
        message,
        media,
        duration,
        thumbnail,
      };

      if (isOfReply) {
        await getGraphql(createPostReplySchema, createPostReplyDataQuery, obj);
      } else {
        await getGraphql(createPostSchema, createPostDataQuery, obj);
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

  const handleCancelSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${isOfReply ? "pt-3" : "pt-10"} pb-0 `}
    >
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
