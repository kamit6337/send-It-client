import ReactIcons from "@/assets/icons";
import { userFollowingPosts } from "@/hooks/usePosts";
import { userProfileQuery } from "@/hooks/useUserProfile";
import { queryClient } from "@/main";

const navlinks = [
  {
    name: "Home",
    outline: ReactIcons.homeOutline,
    solid: ReactIcons.homeSolid,
    href: "/",
    query: async () => {
      return queryClient.prefetchQuery(userFollowingPosts());
    },
  },
  {
    name: "Explore",
    outline: ReactIcons.search,
    solid: ReactIcons.search,
    href: "/explore",
    query: () => {},
  },
  {
    name: "Notifications",
    outline: ReactIcons.notificationOutline,
    solid: ReactIcons.notificationSolid,
    href: "/notifications",
    query: () => {},
  },
  {
    name: "Messages",
    outline: ReactIcons.messageOutline,
    solid: ReactIcons.messageSolid,
    href: "/messages",
    query: () => {},
  },
  {
    name: "Communities",
    outline: ReactIcons.communityOutline,
    solid: ReactIcons.communitySolid,
    href: "/communities",
    query: () => {},
  },
  {
    name: "Premium",
    outline: ReactIcons.homeOutline,
    solid: ReactIcons.homeSolid,
    href: "/premium",
    query: () => {},
  },
  {
    name: "Profile",
    outline: ReactIcons.profileOutline,
    solid: ReactIcons.profileSolid,
    href: "/profile",
    query: async (userName: string) => {
      return queryClient.prefetchQuery(userProfileQuery(userName));
    },
  },
  {
    name: "More",
    outline: ReactIcons.threeDot,
    solid: ReactIcons.threeDot,
    href: "/more",
    query: () => {},
  },
];

export default navlinks;
