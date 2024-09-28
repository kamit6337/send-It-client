import { User } from "@/types";
import MediaAndSubmit from "./MediaAndSubmit";
import Toastify from "@/lib/Toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditAndCancel from "./EditAndCancel";
import findVideoDuration from "@/utils/findVideoDuration";
import uploadVideoAndThumbnail from "@/lib/uploadVideoAndThumbnail";
import uploadToAWS from "@/lib/uploadToAWS";
import { postReq } from "@/utils/api/api";

type SelectedFile = File | null; // Define type for selectedFile

const CreateNewPost = ({
  user,
  handleClose,
  isOfReply = false,
  postId,
}: {
  user: User;
  isOfReply?: boolean;
  handleClose: () => void;
  postId?: string;
}) => {
  const { showErrorMessage, showAlertMessage } = Toastify();
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { photo, name } = user;
  const [isFocused, setIsFocused] = useState(true);

  const maxLength = 200;

  const { register, getValues, reset, watch } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const messageLength = watch("message").length;

  const selectFile = (file: SelectedFile) => {
    setSelectedFile(file);
  };

  const handleCreatePost = async () => {
    try {
      const message = getValues().message;
      if (!message && !selectedFile) {
        showAlertMessage({ message: "Please write a message or add media" });
        return;
      }
      setIsLoading(true);

      if (isOfReply) {
        const media = await uploadToAWS(selectedFile);
        const obj = { postId, message, media };
        await postReq("/reply", obj);
      } else {
        let media;
        let duration;
        let thumbnail;

        if (selectedFile) {
          if (selectedFile.type.startsWith("video/")) {
            duration = await findVideoDuration(selectedFile);
            const { mediaUrl, thumbnailUrl } = await uploadVideoAndThumbnail(
              selectedFile
            );
            media = mediaUrl;
            thumbnail = thumbnailUrl;
          } else {
            media = await uploadToAWS(selectedFile);
          }
        }

        await postReq("/post", { message, media, duration, thumbnail });
      }

      handleClose();
      reset();
      setSelectedFile(null);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex mb-5">
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
          className="bg-inherit w-full resize-none px-3"
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          rows={isFocused ? 4 : 1}
        />
      </div>
      {selectedFile && (
        <div className="w-full relative rounded-xl my-3 border border-border">
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full object-cover rounded-xl"
              alt="Selected Image"
            />
          ) : (
            <video
              key={selectedFile.name} // Use file name as the key to force re-render
              className="w-full rounded-xl"
              controls
            >
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
              Your browser does not support the video tag.
            </video>
          )}
          <EditAndCancel selectedFile={selectFile} />
        </div>
      )}
      <MediaAndSubmit
        isLoading={isLoading}
        handleCreate={handleCreatePost}
        selectedFile={selectFile}
        title={isOfReply ? "Reply" : "Post"}
        messageLength={messageLength}
        maxLength={maxLength}
        isFocused={isFocused}
      />
    </div>
  );
};

export default CreateNewPost;
