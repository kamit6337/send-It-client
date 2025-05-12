import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useExampleSocket = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleExample = (response: string) => {
      console.log("example response", response);
    };

    socket.on("example", handleExample);

    return () => {
      socket.off("example", handleExample);
    };
  }, [queryClient]);

  return;
};

export default useExampleSocket;
