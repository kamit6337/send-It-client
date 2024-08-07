import { CiSearch } from "react-icons/ci";
import {
  LiaAngleLeftSolid,
  LiaAngleRightSolid,
  LiaAngleDoubleLeftSolid,
  LiaAngleDoubleRightSolid,
  LiaAngleDownSolid,
} from "react-icons/lia";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { FaMessage, FaRegMessage } from "react-icons/fa6";
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import {
  BsPerson,
  BsFillPersonFill,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { FaXTwitter, FaPlus } from "react-icons/fa6";
import {
  MdOutlineCancel,
  MdPermMedia,
  MdOutlineFileUpload,
} from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";
import { RiBarChartFill } from "react-icons/ri";

const ReactIcons = {
  share: MdOutlineFileUpload,
  bookMarkOutline: BsBookmark,
  bookmarkSolid: BsFillBookmarkFill,
  views: RiBarChartFill,
  reply: BiMessageRounded,
  heartOutline: IoIosHeartEmpty,
  heartSolid: IoMdHeart,
  search: CiSearch,
  cart: PiShoppingCartSimpleThin,
  leftAngle: LiaAngleLeftSolid,
  rightAngle: LiaAngleRightSolid,
  leftDoubleAngle: LiaAngleDoubleLeftSolid,
  rightDoubleAngle: LiaAngleDoubleRightSolid,
  downArrow: LiaAngleDownSolid,
  threeDot: HiOutlineDotsHorizontal,
  homeOutline: GoHome,
  homeSolid: GoHomeFill,
  notificationOutline: IoMdNotificationsOutline,
  notificationSolid: IoMdNotifications,
  messageOutline: FaRegMessage,
  messageSolid: FaMessage,
  communityOutline: IoPeopleOutline,
  communitySolid: IoPeopleSharp,
  profileOutline: BsPerson,
  profileSolid: BsFillPersonFill,
  twitterLogo: FaXTwitter,
  plus: FaPlus,
  cancel: MdOutlineCancel,
  media: MdPermMedia,
  dot: LuDot,
};

export default ReactIcons;
