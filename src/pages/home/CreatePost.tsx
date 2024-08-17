import EditAndCancel from "@/components/EditAndCancel";
import MediaAndSubmit from "@/components/MediaAndSubmit";
import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import uploadToAWS from "@/lib/uploadToAWS";
import uploadVideoAndThumbnail from "@/lib/uploadVideoAndThumbnail";
import { postReq } from "@/utils/api/api";
import findVideoDuration from "@/utils/findVideoDuration";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SelectedFile = File | null; // Define type for selectedFile

const CreatePost = () => {
  const { data: user } = useLoginCheck();
  const { showErrorMessage, showAlertMessage } = Toastify();
  const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, getValues, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

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
    <>
      <div className="border-b border-div_border w-full p-5 pb-0 flex gap-5">
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
            className="bg-inherit w-full resize-none overflow-hidden"
            maxLength={200}
            rows={4}
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

          <div className="sticky bottom-0 space-y-3 bg-background py-2">
            <MediaAndSubmit
              isLoading={isLoading}
              handleCreate={handleCreatePost}
              selectedFile={selectFile}
              title={"Post"}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
