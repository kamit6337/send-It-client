import { USER } from "@/types";

const userProfileLinks = (email: string | undefined, actualUser: USER) => {
  if (email !== actualUser.email) {
    const userLinks = [
      {
        name: "Posts",
        href: `/${email}`,
      },
      {
        name: "Replies",
        href: `/${email}/replies`,
      },
      {
        name: "Media",
        href: `/${email}/media`,
      },
    ];

    return userLinks;
  }

  const userLinks = [
    {
      name: "Posts",
      href: `/${email}`,
    },
    {
      name: "Likes",
      href: `/${email}/likes`,
    },
    {
      name: "Replies",
      href: `/${email}/replies`,
    },
    {
      name: "Media",
      href: `/${email}/media`,
    },
    {
      name: "Saved",
      href: `/${email}/save`,
    },
  ];

  return userLinks;
};

export default userProfileLinks;
