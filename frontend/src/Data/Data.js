// Sidebar imports
import {
UilEstate,
UilClipboardAlt,
UilUsersAlt,
UilPackage,
UilChart,
UilSignOutAlt,
} from "@iconscout/react-unicons";
import { UilCommentAlt, UilMusic, UilImages, UilVideo, UilArrow } from '@iconscout/react-unicons'
import { UisHouseUser, UisMinusSquareFull } from '@iconscout/react-unicons-solid'

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
{
    icon: UilEstate,
    heading: "Dashboard",
},
{
    icon: UilClipboardAlt,
    heading: "Conversation",
},
{
    icon: UilUsersAlt,
    heading: "Background r.",
},
{
    icon: UilPackage,
    heading: 'Image gen'
},
{
    icon: UilChart,
    heading: 'Code gen'
},
];

// Recent Update Card Data
export const UpdatesData = [
{
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
},
{
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
},
{
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
},
];