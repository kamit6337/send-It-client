import EditAndCancel from "@/components/EditAndCancel";
import MediaAndSubmit from "@/components/MediaAndSubmit";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import uploadToAWS from "@/lib/uploadToAWS";
import { type User } from "@/types";
import { postReq } from "@/utils/api/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  postId: string;
  actualUser: User;
};

const CreateReply = ({ actualUser, postId }: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage, showAlertMessage } = Toastify();

  const { register, getValues, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const handleCreateReply = async () => {
    try {
      const message = getValues().message;
      if (!message && !selectedFile) {
        showAlertMessage({ message: "Please write a message or add media" });
        return;
      }
      setIsLoading(true);

      let media;
      if (selectedFile) {
        media = await uploadToAWS(selectedFile);
      }
      await postReq("/reply", { postId, message, media });
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
      <div className="px-5 py-3 border-b border-div_border flex gap-2">
        <div className="w-10">
          <img
            src={actualUser.photo}
            alt={actualUser.name}
            className="w-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="mt-2">
            <textarea
              {...register("message")}
              placeholder="Post Your Reply"
              className="text-lg w-full resize-none"
              onFocus={() => setIsFocus(true)}
              rows={isFocus ? 4 : 1}
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
              <EditAndCancel selectedFile={selectFile} />
            </div>
          )}
          {isFocus && (
            <div className="py-4">
              <MediaAndSubmit
                title={"Reply"}
                isLoading={isLoading}
                selectedFile={selectFile}
                handleCreate={handleCreateReply}
              />
            </div>
          )}
        </div>
        {!isFocus && <button className="post_btn self-start">Reply</button>}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateReply;
