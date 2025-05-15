export type POST_SOCKET = {
  pages: POST[][];
};

export type PARAMS = {
  id: string;
  email: string;
};

export type FOLLOWER = {
  _id: string;
  follower: USER;
  user: USER;
  isActualUserFollow: boolean;
};

export type ROOM = {
  _id: string;
  users: USER[];
  createdAt: string;
  updatedAt: string;
};

export type CHAT = {
  _id: string;
  room: string;
  sender: string;
  message: string;
  media: string;
  createdAt: string;
  updatedAt: string;
};

export type SIMPLE_POST = {
  _id: string;
  message: string;
  media: string;
  likeCount: number;
  viewCount: number;
  saveCount: number;
  replyCount: number;
  retweetCount: number;
};

export type POST = {
  _id: string;
  message: string;
  media: string;
  thumbnail?: string;
  duration?: number;
  replyPostId?: string;
  createdAt: string;
  updatedAt: string;
  user: USER;
};

export type POST_DETAIL = {
  _id: string;
  likeCount: number;
  viewCount: number;
  saveCount: number;
  replyCount: number;
  retweetCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isReply: boolean;
  isFollow: boolean;
  createdAt: string;
  updatedAt: string;
};

export type USER = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  bg_photo: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string;
  updatedAt: string;
};

export type USER_PROFILE = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  bg_photo: string;
  bio: string;
  location: string;
  website: string;
  userPosts: number;
  likePosts: number;
  replyPosts: number;
  mediaPosts: number;
  savePosts: number;
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type REPLY = {
  _id: string;
  post: string;
  replyPost: POST;
};

export type REPLY_FULL = {
  _id: string;
  post: POST;
  replyPost: POST;
};

export type LIKE = {
  _id: string;
  post: string;
  user: string;
};

export type SAVE = {
  _id: string;
  post: string;
  user: string;
};
