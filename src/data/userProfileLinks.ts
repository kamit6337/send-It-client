import { User } from "@/types";

const userProfileLinks = (username: string | undefined, actualUser: User) => {
  if (username !== actualUser.username) {
    const userLinks = [
      {
        name: "Posts",
        href: `/${username}`,
      },
      {
        name: "Replies",
        href: `/${username}/replies`,
      },
      {
        name: "Media",
        href: `/${username}/media`,
      },
    ];

    return userLinks;
  }

  const userLinks = [
    {
      name: "Posts",
      href: `/${username}`,
    },
    {
      name: "Likes",
      href: `/${username}/likes`,
    },
    {
      name: "Replies",
      href: `/${username}/replies`,
    },
    {
      name: "Media",
      href: `/${username}/media`,
    },
    {
      name: "Saved",
      href: `/${username}/save`,
    },
  ];

  return userLinks;
};

export default userProfileLinks;
