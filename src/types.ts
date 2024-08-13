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
  replyCount: number;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
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
  user: User;
  replyPost: Post;
};
