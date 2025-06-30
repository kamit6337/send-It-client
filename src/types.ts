type TYPE = "like" | "reply" | "follower" | "message";

export type NOTIFICATION = {
  _id: string;
  user: string;
  type: TYPE;
  message: string;
  sender: USER[];
  totalSenders: number;
  isRead: boolean;
  post?: POST;
  room?: ROOM;
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
  unSeenChatsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CHAT = {
  _id: string;
  room: string;
  sender: string;
  message: string;
  media: string;
  isSeen: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// export type SIMPLE_POST = {
//   _id: string;
//   message: string;
//   media: string;
//   likeCount: number;
//   viewCount: number;
//   saveCount: number;
//   replyCount: number;
//   retweetCount: number;
// };

export type POST = {
  _id: string;
  message: string;
  media: string;
  thumbnail?: string;
  duration?: number;
  replyPost?: POST;
  createdAt: string;
  updatedAt: string;
  user: USER;
};

export type POST_DETAIL = {
  _id: string;
  post: string;
  likeCount: number;
  viewCount: number;
  saveCount: number;
  replyCount: number;
  retweetCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  updatedAt: string;
};

export type USER = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  bg_photo?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
  isFollowed?: boolean;
};

export type FOLLOWER_USER = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  isFollowed: boolean;
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
  messageBy: "anyone" | "followers" | "followings" | "no_one";
  followingCount: number;
  followersCount: number;
  userPosts: number;
  likePosts: number;
  replyPosts: number;
  mediaPosts: number;
  savePosts: number;
  isFollowed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type REPLY = {
  _id: string;
  user: USER;
  message: string;
  media: string;
  thumbnail?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
  replyPost: POST;
  replies: POST[];
};
