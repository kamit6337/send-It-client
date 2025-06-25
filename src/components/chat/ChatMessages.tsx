import ReactIcons from "@/assets/icons";
import { useForm } from "react-hook-form";
import Toastify from "@/lib/Toastify";
import { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Loading from "@/lib/Loading";
import imageAndVideoSizeFilteration from "@/utils/javascript/imageAndVideoSizeFilteration";
import getGraphql from "@/utils/api/graphql";
import createNewChatSchema, {
  createNewChatDataQuery,
} from "@/graphql/chat/createNewChatSchema";
import uploadImageOrVideo from "@/lib/uploadImageOrVideo";
import FullScreenImage from "../FullScreenImage";
import ChatRoomMessages from "./ChatRoomMessages";

type FormData = {
  message: string;
};

const ChatMessages = () => {
  const { activeRoom } = useSelector(roomState);
  const { showErrorMessage, showAlertMessage } = Toastify();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      message: "",
    },
  });

  // const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior });
  //   }
  // };

  // useLayoutEffect(() => {
  //   scrollToBottom("instant");
  // }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const { message } = data;

      if (!message && !selectedFile) {
        showAlertMessage({
          message: "Please type message or select file",
        });
        return;
      }

      const media = await uploadImageOrVideo(selectedFile, "CHAT");

      await getGraphql(createNewChatSchema, createNewChatDataQuery, {
        roomId: activeRoom?._id,
        message,
        media,
      });

      reset();
      removeSelectedFile();
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReturn = imageAndVideoSizeFilteration(file);

    if (fileReturn) {
      setSelectedFile(fileReturn);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input's value
    }
  };

  if (!activeRoom) return;

  return (
    <>
      <div className="h-full relative">
        <div style={{ height: "calc(100% - 56px)" }}>
          <ChatRoomMessages activeRoom={activeRoom} />
        </div>

        {/* NOTE: MESSAGE SENDING */}
        <div className="h-14 w-full flex items-center bg-background border-t border-div_border absolute bottom-0 z-10 px-2">
          {/* NOTE: SELECTED IMAGE FILE */}
          {selectedFile && (
            <div className="absolute z-10 bottom-full left-0 text-sm border border-div_border p-2 flex items-center gap-2 bg-white ">
              <Dialog>
                <DialogTrigger className="hover:underline underline-offset-4 truncate w-32">
                  {selectedFile.name}
                </DialogTrigger>
                <DialogContent className="p-0 top-0 translate-y-0 w-max">
                  <FullScreenImage src={URL.createObjectURL(selectedFile)} />
                </DialogContent>
              </Dialog>
              <button
                className="text-xl text-red-400"
                onClick={removeSelectedFile}
              >
                <ReactIcons.cancel />
              </button>
            </div>
          )}

          {/* NOTE: MESSAGE FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-post_hover_bg text-sky_blue rounded-full flex gap-5 w-full items-center px-5 py-2"
          >
            <button type="button" onClick={() => fileRef.current?.click()}>
              <ReactIcons.media />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </button>

            <div className="flex-1">
              <input
                {...register("message")}
                placeholder="Write something"
                className="bg-inherit text-sm w-full text-foreground outline-none"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loading height={"full"} small={true} />
              ) : (
                <ReactIcons.send />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
