export type PostSocket = {
  pages: Post[][];
};

export type PostDetails = {
  data: {
    _id: string;
    likeCount: number;
    saveCount: number;
    replyCount: number;
    isLiked: boolean;
    isSaved: boolean;
    isReply: boolean;
  };
};

export type Params = {
  id: string;
  username: string;
};

export type Follower = {
  _id: string;
  follower: User;
  user: User;
  isActualUserFollow: boolean;
};

export type OutletContext = {
  actualUser: User;
  user: User;
};

export type Room = {
  _id: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
};

export type Chat = {
  _id: string;
  room: string;
  sender: string;
  message: string;
  media: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  _id: string;
  message: string;
  media: string;
  thumbnail: string;
  duration: number;
  replyCount: number;
  likeCount: number;
  viewCount: number;
  saveCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isSaved: boolean;
  isFollow: boolean;
};

export type User = {
  _id: string;
  name: string;
  username: string;
  photo: string;
  bg_photo: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
  likeCount: number;
  replyCount: number;
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;
};

export type Reply = {
  _id: string;
  post: string;
  replyPost: Post;
};

export type ReplyFull = {
  _id: string;
  post: Post;
  replyPost: Post;
};

export type Like = {
  _id: string;
  post: string;
  user: string;
};

export type Save = {
  _id: string;
  post: string;
  user: string;
};
