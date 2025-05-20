export type POST_SOCKET = {
  pages: POST[][];
};

type TYPE = "like" | "reply" | "follower" | "message";

export type NOTIFICATION = {
  _id: string;
  user: string;
  type: TYPE;
  message: string;
  sender: USER[];
  totalSenders: number;
  isRead: boolean;
  post: string;
  room: string;
};

export type PARAMS = {
  id: string;
  email: string;
};

export type FOLLOWER = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isFollowed: boolean;
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
  createdAt?: string;
  updatedAt?: string;
  user: USER | string;
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
  isFollowed?: boolean;
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
  message: string;
  media: string;
  thumbnail?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
  user: USER;
  replyPostId: POST;
};
