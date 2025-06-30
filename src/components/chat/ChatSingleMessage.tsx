import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import actualDateAndTime from "@/utils/javascript/actualDateAndTime";
import { CHAT, USER } from "@/types";
import FullScreenImage from "../FullScreenImage";
import ChatOptions from "./ChatOptions";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  chat: CHAT;
  actualUser: USER;
  onVisible: (chatId: string) => void;
};

const ChatSingleMessage = ({ chat, actualUser, onVisible }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    _id: chatId,
    room: roomId,
    sender,
    message,
    createdAt,
    media,
    isSeen,
    deleted,
  } = chat;

  useEffect(() => {
    if (inView && !isSeen) {
      // i have to make post request to backend using chatId
      onVisible(chatId);
    }
  }, [inView]);

  // MARK: ACTUAL USER MESSAGE
  if (sender === actualUser._id) {
    // NOTE: DELETED CHAT
    if (deleted)
      return (
        <div>
          <div className="w-full flex items-center justify-end">
            <p className="w-60 bg-gray-500 text-white italic rounded-2xl text-sm py-2 px-3">
              This message was deleted
            </p>
          </div>
          <p className="text-end text-xs mt-1 mr-3">
            {actualDateAndTime(createdAt)}
          </p>
        </div>
      );

    // NOTE: USER MEDIA AND MESSAGE
    if (message && media) {
      return (
        <div>
          <div className="flex items-center gap-4 justify-end group">
            <ChatOptions chatId={chatId} roomId={roomId} />

            <div className="w-60 self-end break_long">
              <Dialog>
                <DialogTrigger className="w-full border border-div_border rounded-xl  cursor-pointer">
                  <img
                    src={media}
                    alt={media}
                    className="w-full h-full rounded-t-xl object-cover p-0 m-0"
                  />
                  <p
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-default flex justify-start text-white w-full bg-sky_blue rounded-b-xl py-2 px-3 text-sm"
                  >
                    {message}
                  </p>
                </DialogTrigger>
                <DialogContent className="p-0 top-0 translate-y-0 w-max">
                  <FullScreenImage src={media} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <p className="text-end text-xs mt-1 mr-3">
            {actualDateAndTime(createdAt)}
          </p>
        </div>
      );
    }

    // NOTE: USER MEDIA
    if (media) {
      return (
        <div>
          <div className="flex items-center gap-4 justify-end group">
            <ChatOptions chatId={chatId} roomId={roomId} />

            <div className="w-60 self-end break_long ">
              <Dialog>
                <DialogTrigger className="w-full border border-div_border rounded-xl cursor-pointer">
                  <img
                    src={media}
                    alt={media}
                    className="w-full h-full rounded-xl object-cover p-0 m-0"
                  />
                </DialogTrigger>
                <DialogContent className="p-0 top-0 translate-y-0 w-max">
                  <FullScreenImage src={media} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <p className="text-end text-xs mt-1 mr-3">
            {actualDateAndTime(createdAt)}
          </p>
        </div>
      );
    }

    // NOTE: USER MESSAGE
    return (
      <div>
        <div className="flex items-center gap-4 justify-end group">
          <ChatOptions chatId={chatId} roomId={roomId} />

          <div className="w-60 self-end break_long  ">
            <p className="w-full bg-sky_blue text-white rounded-2xl text-sm py-2 px-3 break-all text-wrap">
              {message}
            </p>
          </div>
        </div>
        <p className="text-end text-xs mt-1 mr-3">
          {actualDateAndTime(createdAt)}
        </p>
      </div>
    );
  }

  // MARK: SECOND USER MESSAGE

  // NOTE: DELETED CHAT
  if (deleted)
    return (
      <div ref={ref} className="w-60 self-start break_long">
        <p className="w-full bg-gray-500 text-white italic rounded-2xl text-sm py-2 px-3">
          This message was deleted
        </p>
        <p className="text-start text-xs mt-1 ml-3">
          {actualDateAndTime(createdAt)}
        </p>
      </div>
    );

  // NOTE: SENDER MEDIA AND MESSAGE
  if (message && media) {
    return (
      <div ref={ref} className="w-60 self-start break_long">
        <Dialog>
          <DialogTrigger className="w-full border border-div_border rounded-xl  cursor-pointer">
            <img
              src={media}
              alt={media}
              className="w-full h-full rounded-t-xl object-cover p-0 m-0"
            />
            <p
              onClick={(e) => e.stopPropagation()}
              className="cursor-default flex justify-start bg-gray-100 text-black w-full rounded-b-xl py-2 px-3 text-sm"
            >
              {message}
            </p>
          </DialogTrigger>
          <DialogContent className="p-0 top-0 translate-y-0 w-max">
            <FullScreenImage src={media} />
          </DialogContent>
        </Dialog>
        <p className="text-start text-xs mt-1 ml-3">
          {actualDateAndTime(createdAt)}
        </p>
      </div>
    );
  }

  // NOTE: SENDER MEDIA
  if (media) {
    return (
      <div ref={ref} className="w-60 self-start break_long">
        <Dialog>
          <DialogTrigger className="w-full border border-div_border rounded-xl cursor-pointer">
            <img
              src={media}
              alt={media}
              className="w-full h-full rounded-xl object-cover p-0 m-0"
            />
          </DialogTrigger>
          <DialogContent className="p-0 top-0 translate-y-0 w-max">
            <FullScreenImage src={media} />
          </DialogContent>
        </Dialog>

        <p className="text-start text-xs mt-1 ml-3">
          {actualDateAndTime(createdAt)}
        </p>
      </div>
    );
  }

  // NOTE: SENDER MESSAGE
  return (
    <div ref={ref} className="w-60 self-start break_long">
      <p className="w-full bg-gray-100 text-black rounded-2xl text-sm py-2 px-3">
        {message}
      </p>
      <p className="text-start text-xs mt-1 ml-3">
        {actualDateAndTime(createdAt)}
      </p>
    </div>
  );
};

export default ChatSingleMessage;
