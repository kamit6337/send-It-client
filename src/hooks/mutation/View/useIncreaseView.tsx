import { postReq } from "@/utils/api/api";
import { useMutation } from "@tanstack/react-query";

const useIncreaseView = (postId) => {
  const mutation = useMutation({
    mutationKey: ["post view update", postId],
    mutationFn: (id) => postReq("/view", { id }),
  });

  return mutation;
};

export default useIncreaseView;
