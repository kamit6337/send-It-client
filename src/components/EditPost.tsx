import Toastify from "@/lib/Toastify";
import { Post } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditAndCancel from "./EditAndCancel";
import MediaAndSubmit from "./MediaAndSubmit";
import uploadToAWS from "@/lib/uploadToAWS";
import { patchReq } from "@/utils/api/api";
import findVideoDuration from "@/utils/findVideoDuration";
import uploadVideoAndThumbnail from "@/lib/uploadVideoAndThumbnail";
import { useLocation, useNavigate } from "react-router-dom";
import useSinglePost from "@/hooks/useSinglePost";
import useReplyPost from "@/hooks/useReplyPost";

type Props = {
  post: Post;
  isReply: boolean;
  handleClose: () => void;
};

type SelectedFile = File | string | null; // Define type for selectedFile

const imageTypeList = ["png", "jpeg", "jpg"];

const EditPost = ({ post, handleClose, isReply }: Props) => {
  const { showErrorMessage, showAlertMessage } = Toastify();
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isInPostsUrl = pathname.startsWith("/posts/");
  const isInReplyUrl = pathname.startsWith("/reply/");
  const replyId = isInReplyUrl ? pathname.split("/").at(-1) : "";

  const { refetch: refetchRepltPost } = useReplyPost(replyId);

  const {
    _id,
    user: { username, name, photo },
    message,
    media,
    duration = 0,
    thumbnail = "",
  } = post;

  const [selectedFile, setSelectedFile] = useState<SelectedFile>(media);
  const { refetch } = useSinglePost(_id);

  const maxLength = 200;

  const { register, getValues, reset, watch } = useForm({
    defaultValues: {
      message: message,
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

      if (isReply) {
        let updatedMedia = media;
        if (selectedFile && typeof selectedFile !== "string") {
          updatedMedia = await uploadToAWS(selectedFile);
        }
        const response = await patchReq("/reply", {
          id: _id,
          message,
          media: updatedMedia,
        });

        navigate(`/posts/${response.data}`);
      } else {
        let updatedMedia = media;
        let updatedDuration = duration;
        let updatedThumbnail = thumbnail;

        if (selectedFile && typeof selectedFile !== "string") {
          if (selectedFile.type.startsWith("video/")) {
            updatedDuration = (await findVideoDuration(selectedFile)) as number;
            const { mediaUrl, thumbnailUrl } = await uploadVideoAndThumbnail(
              selectedFile
            );
            updatedMedia = mediaUrl;
            updatedThumbnail = thumbnailUrl;
          } else {
            updatedMedia = await uploadToAWS(selectedFile);
          }
        }

        await patchReq("/post", {
          id: _id,
          message,
          media: updatedMedia,
          duration: updatedDuration,
          thumbnail: updatedThumbnail,
        });
      }

      handleClose();
      reset();
      setSelectedFile(null);

      if (isInPostsUrl) {
        refetch();
      }

      if (isInReplyUrl) {
        refetchRepltPost();
      }
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const imageType = media.split(".").at(-1) as string;

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

      <div
        className={`${
          !!selectedFile && "border border-div_border"
        }  w-full relative rounded-xl my-5 `}
      >
        {typeof selectedFile === "string" &&
          imageTypeList.includes(imageType) && (
            <img
              src={media}
              className="w-full object-cover rounded-xl"
              alt="Selected Image"
            />
          )}

        {selectedFile?.type?.startsWith("image/") && (
          <img
            src={URL.createObjectURL(selectedFile)}
            className="w-full object-cover rounded-xl"
            alt="Selected Image"
          />
        )}

        {typeof selectedFile === "string" && selectedFile.endsWith(".mp4") && (
          <video className="w-full rounded-xl" controls>
            <source src={selectedFile} type={"video/mp4"} />
            Your browser does not support the video tag.
          </video>
        )}

        {selectedFile?.type?.startsWith("video/") && (
          <video
            key={selectedFile?.name} // Use file name as the key to force re-render
            className="w-full rounded-xl"
            controls
          >
            <source
              src={URL.createObjectURL(selectedFile)}
              type={selectedFile?.type}
            />
            Your browser does not support the video tag.
          </video>
        )}

        {!!selectedFile && <EditAndCancel selectedFile={selectFile} />}
      </div>
      <div className="sticky bottom-0 bg-background pb-3">
        <MediaAndSubmit
          isLoading={isLoading}
          handleCreate={handleCreatePost}
          selectedFile={selectFile}
          title={isReply ? "Reply" : "Update Post"}
          messageLength={messageLength}
          maxLength={maxLength}
          isFocused={isFocused}
        />
      </div>
    </div>
  );
};

export default EditPost;
