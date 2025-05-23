import Loading from "@/lib/Loading";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { CHAT, ROOM } from "@/types";
import useRoomChats from "@/hooks/chat/useRoomChats";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import ChatSingleMessage from "./ChatSingleMessage";
import debounce from "@/utils/javascript/debounce";
import ReactIcons from "@/assets/icons";
import waitForImagesToLoad from "@/utils/waitForImagesToLoad";

type Props = {
  activeRoom: ROOM;
};

const ChatRoomMessages = ({ activeRoom }: Props) => {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useRoomChats(activeRoom._id);
  const { data: actualUser } = useLoginCheck();
  const [isAtBottom, setIsAtBottom] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { ref: newPageRef, inView } = useInView();

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down"); // Keep track of scroll direction

  const chats = data?.pages.flatMap((page) => page) as CHAT[];

  const member = useMemo(() => {
    const member = activeRoom?.users.find(
      (user) => user._id !== actualUser._id
    );
    return member;
  }, [activeRoom, actualUser._id]);

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  useLayoutEffect(() => {
    scrollToBottom("instant");
  }, []);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (chats?.length > 0 && chatContainer) {
      waitForImagesToLoad(chatContainer).then(() => {
        // Scroll to bottom if user was already at the bottom
        if (isAtBottom) {
          scrollToBottom("instant");
        }

        // Manually trigger scroll handler to update scroll state
        handleScroll();
      });
    }
  }, [chats?.length]);

  useEffect(() => {
    if (
      inView &&
      scrollDirection === "up" &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, scrollDirection, hasNextPage]);

  const handleScroll = debounce(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Ensure previous scroll position is a number, default to 0 if undefined
      const prevScrollTop = parseFloat(
        chatContainer.dataset.prevScrollTop || "0"
      );

      // Set scroll direction based on the previous scroll position
      if (scrollTop < prevScrollTop) {
        setScrollDirection("up");
      } else {
        setScrollDirection("down");
      }

      console.log("distanceFromBottom", distanceFromBottom);

      // Are we at bottom? (threshold 50px)
      setIsAtBottom(distanceFromBottom < 50);

      // Update previous scroll position
      chatContainer.dataset.prevScrollTop = String(scrollTop);
    }
  }, 100);

  useLayoutEffect(() => {
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
    return <Loading />;
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
        to={`/${member?.email}`}
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
        <p>{member?.email}</p>
        <p>{member?.bio}</p>
      </Link>
      {/* NOTE: CHAT MESSAGES */}

      {hasNextPage && !isFetchingNextPage && <div ref={newPageRef} />}

      <div className="flex flex-col-reverse gap-10 pt-5 pb-10">
        {chats.length > 0 ? (
          chats.map((chat) => {
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
      {!isAtBottom && (
        <button
          className="fixed bottom-20 right-5 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full shadow-lg transition"
          onClick={() => scrollToBottom("smooth")}
        >
          <ReactIcons.downArrow />
        </button>
      )}
    </div>
  );
};

export default ChatRoomMessages;
