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
import { BsPerson, BsFillPersonFill } from "react-icons/bs";
import { FaXTwitter, FaPlus } from "react-icons/fa6";
import { MdOutlineCancel, MdPermMedia } from "react-icons/md";

const ReactIcons = {
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
  media : MdPermMedia
};

export default ReactIcons;
