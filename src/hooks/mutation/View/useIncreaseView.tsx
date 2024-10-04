import { postReq } from "@/utils/api/api";
import { useMutation } from "@tanstack/react-query";

const useIncreaseView = (postId: string) => {
  const mutation = useMutation({
    mutationKey: ["post view update", postId],
    mutationFn: () => postReq("/view", { id: postId }),
  });

  return mutation;
};

export default useIncreaseView;
