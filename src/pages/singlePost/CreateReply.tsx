import ReactIcons from "@/assets/icons";
import createPostReplySchema, {
  createPostReplyDataQuery,
} from "@/graphql/reply/createPostReplySchema";
import Loading from "@/lib/Loading";
import Toastify from "@/lib/Toastify";
import { USER } from "@/types";
import getGraphql from "@/utils/api/graphql";
import imageAndVideoSizeFilteration from "@/utils/javascript/imageAndVideoSizeFilteration";
import uploadImageOrVideoForPost from "@/utils/upload/uploadImageOrVideoForPost";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  postId: string;
  actualUser: USER;
};

const CreateReply = ({ actualUser, postId }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showErrorMessage, showAlertMessage } = Toastify();
  const fileRef = useRef<HTMLInputElement>(null);
  const maxLength = 200;

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    watch,
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

      const { media, thumbnail, duration } = await uploadImageOrVideoForPost(
        selectedFile
      );

      const response = await getGraphql(
        createPostReplySchema,
        createPostReplyDataQuery,
        {
          postId,
          message,
          media,
          thumbnail,
          duration,
        }
      );

      console.log("response", response);

      setIsFocus(false);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-3 border-b border-div_border flex gap-2"
    >
      <div className="w-10">
        <img
          src={actualUser.photo}
          alt={actualUser.name}
          className="w-full object-cover rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="">
          <textarea
            {...register("message")}
            placeholder="Post Your Reply"
            className="bg-inherit w-full resize-none p-3 border rounded"
            onFocus={() => setIsFocus(true)}
            rows={isFocus ? 4 : 1}
            maxLength={maxLength}
          />
        </div>
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
        {isFocus && (
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
              {isFocus && (
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
                ) : (
                  "Reply"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {!isFocus && <button className="post_btn self-start">Reply</button>}

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

export default CreateReply;
