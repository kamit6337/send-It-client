import Cookies from "js-cookie";

export const checkAlreadyView = (postId: string) => {
  const getPostIds = Cookies.get("viewPostIds");
  if (!getPostIds) return false;
  const findPost = JSON.parse(getPostIds).includes(postId);
  return findPost;
};

export const setViewPostId = (postId: string) => {
  const getPostIds = Cookies.get("viewPostIds");

  if (!getPostIds) {
    Cookies.set("viewPostIds", JSON.stringify([postId]), { expires: 1 });
  } else {
    const newArr = [...new Set([postId, ...JSON.parse(getPostIds)])];
    Cookies.set("viewPostIds", JSON.stringify(newArr), { expires: 1 });
  }
};
