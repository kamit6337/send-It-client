import ReactIcons from "@/assets/icons";
import { useForm } from "react-hook-form";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { postReq } from "@/utils/api/api";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleChat, roomState } from "@/redux/slice/roomSlice";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FullScreenImage from "@/components/FullScreenImage";
import Loading from "@/lib/Loading";
import uploadToAWS from "@/lib/uploadToAWS";
import { joinRooms, offNewChat, onNewChat } from "@/lib/socketIO";
import useLoginCheck from "@/hooks/useLoginCheck";
import ChatSingleMessage from "./ChatSingleMessage";
import { Chat } from "@/types";

type Props = {
  id: string | undefined | null;
};

type FormData = {
  message: string;
};

const ChatMessages = ({ id = null }: Props) => {
  const dispatch = useDispatch();
  const { activeRoom } = useSelector(roomState);
  const { data: actualUser } = useLoginCheck();
  const { showErrorMessage, showAlertMessage } = Toastify();
  const { rooms, chats } = useSelector(roomState);
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to track the end of the chat messages
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref to track the end of the chat messages

  console.log("isScrollUp", isScrollUp);

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

  const member = useMemo(() => {
    const findRoom = rooms?.find(
      (room) => room._id === id || room._id === activeRoom
    );
    const member = findRoom?.users.find((user) => user._id !== actualUser._id);
    return member;
  }, [id, activeRoom, rooms, actualUser._id]);

  const roomChats = useMemo(() => {
    if (chats.length === 0) return [];
    const chat = chats.filter(
      (chat) => chat.room === id || chat.room === activeRoom
    );
    return chat;
  }, [id, activeRoom, chats]);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useLayoutEffect(() => {
    // Initial scroll to bottom when component mounts
    scrollToBottom("instant");
  }, []);

  useLayoutEffect(() => {
    // Scroll to bottom whenever a new chat is added
    scrollToBottom("smooth");
  }, [roomChats]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;

        console.log("scrollTop 776", scrollTop);
        console.log("scrollHeight 1104", scrollHeight);
        console.log("clientHeight 328", clientHeight);

        // Calculate the distance from the bottom of the chat window
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

        // If the user scrolls up more than 200px from the bottom, show the scroll down button
        setIsScrollUp(distanceFromBottom > 100);
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      const roomsId = rooms.map((room) => room._id);
      joinRooms(roomsId);
    }
  }, [rooms]);

  useEffect(() => {
    const handleChat = (chat: Chat) => {
      dispatch(addSingleChat(chat));
    };
    onNewChat(handleChat);
    return () => {
      offNewChat(handleChat);
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const { message } = data;

      if (!message && !selectedFile) {
        showAlertMessage({
          message: "Please type message or select file",
        });
        return;
      }
      const media = await uploadToAWS(selectedFile, "/chat");
      await postReq("/chat", { roomId: id || activeRoom, message, media });
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
    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset the file input's value
    }
  };

  return (
    <>
      <div className="h-full relative">
        <div
          ref={chatContainerRef}
          className="overflow-y-auto px-3"
          style={{ height: "calc(100% - 56px)" }}
        >
          {/* NOTE: MEMBER INFO */}
          <Link
            to={`/${member?.username}`}
            className="h-60 w-full flex flex-col pt-10 items-center border-b border-div_border hover:bg-gray-50"
          >
            <div className="w-10">
              <img
                src={member?.photo}
                alt={member?.name}
                className="w-full object-cover rounded-full"
              />
            </div>
            <p>{member?.name}</p>
            <p>@{member?.username}</p>
            <p>{member?.bio}</p>
          </Link>
          {/* NOTE: CHAT MESSAGES */}
          <div className="flex flex-col gap-10 py-5">
            {roomChats.length > 0 ? (
              roomChats.map((chat) => {
                return (
                  <ChatSingleMessage
                    key={chat._id}
                    chat={chat}
                    actualUser={actualUser}
                  />
                );
              })
            ) : (
              <p>No chat Available</p>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* NOTE: MESSAGE SENDING */}
        <div className="h-14 w-full flex items-center bg-background border-t border-div_border absolute bottom-0 z-10 px-2">
          {/* NOTE: SCROLL TO BOTTOM BUTTON */}
          {isScrollUp && (
            <button
              onClick={() => scrollToBottom("instant")}
              className="absolute z-10 bottom-full right-0 mr-10 mb-5 text-xl border border-div_border p-2 rounded-full bg-background"
            >
              <ReactIcons.arrowDown />
            </button>
          )}

          {/* NOTE: SLECTED IMAGE FILE */}
          {selectedFile && (
            <div className="absolute z-10 bottom-full left-0 text-sm border border-div_border p-2 flex items-center gap-2">
              <Dialog>
                <DialogTrigger className="hover:underline underline-offset-4">
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
            className="bg-gray-100 text-sky_blue rounded-full flex gap-5 w-full items-center px-5 py-2"
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
                className="bg-inherit text-sm w-full text-foreground"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loading hScreen={false} small={true} />
              ) : (
                <ReactIcons.send />
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChatMessages;
