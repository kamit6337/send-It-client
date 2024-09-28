import useRoomChats from "@/hooks/useRoomChats";
import Loading from "@/lib/Loading";
import ChatSingleMessage from "./ChatSingleMessage";
import useLoginCheck from "@/hooks/useLoginCheck";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import debounce from "@/utils/javascript/debounce";

const ChatRoomMessages = ({ roomId, handleScrollUp, messagesEndRef }) => {
  const { isLoading, error, data, fetchNextPage, isFetching, hasNextPage } =
    useRoomChats(roomId);
  const { data: actualUser } = useLoginCheck();
  const { rooms } = useSelector(roomState);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const firstPageLength = data?.pages[0].length;

  const { ref: newPageRef, inView } = useInView();

  console.log("firstPageLength", firstPageLength);
  console.log("data?.pages", data?.pages);
  console.log("hasNextPage", hasNextPage);
  console.log("isFetching", isFetching);

  const member = useMemo(() => {
    const findRoom = rooms?.find((room) => room._id === roomId);
    const member = findRoom?.users.find((user) => user._id !== actualUser._id);
    return member;
  }, [roomId, rooms, actualUser._id]);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom("instant");
  }, []);

  useLayoutEffect(() => {
    scrollToBottom("smooth");
  }, [firstPageLength]);

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage]);

  const handleScroll = debounce(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      handleScrollUp(distanceFromBottom > 100);
    }
  }, 200);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (isLoading) {
    return <Loading hScreen={false} small={true} />;
  }

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto px-3 h-full relative"
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
      <div ref={newPageRef} />
      <div className="flex flex-col-reverse gap-10 py-5">
        {firstPageLength !== 0 ? (
          data?.pages.map((page) => {
            return page.map((chat) => {
              return (
                <ChatSingleMessage
                  key={chat._id}
                  chat={chat}
                  actualUser={actualUser}
                />
              );
            });
          })
        ) : (
          <p>No chat Available</p>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
  //
};

export default ChatRoomMessages;
