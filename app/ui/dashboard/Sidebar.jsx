"use client";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import ToggleSwitch from "./ToggleSwitch";
import { LayoutDashboard, LogOut, TrendingUp, User } from "lucide-react";
import { GiTwoCoins } from "react-icons/gi";
import { LuRadar } from "react-icons/lu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Logo from "@/components/shared/Logo";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Coins",
    path: "/coins",
    icon: <GiTwoCoins size={22} />,
  },
  {
    title: "Trending",
    path: "/trending",
    icon: <TrendingUp />,
  },
  {
    title: "Revenue",
    path: "/dashboard/revenue",
    icon: <MdWork size={22} />,
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: <MdAnalytics size={22} />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <MdOutlineSettings size={22} />,
  },
];

const MenuLink = ({ item }) => (
  <Link
    href={item.path}
    className="flex font-mont items-center gap-2 py-5 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
  >
    <span className="">{item.icon}</span>
    <span className="hidden lg:inline">{item.title}</span>
  </Link>
);

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove("accessToken");
    localStorage.removeItem("userInfo");
    router.replace("/login");
  };
  return (
    <div className="bg-gray-800 text-white h-screen w-16 lg:w-52 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-400">
      <div className="flex flex-col items-center h-full py-6">
        <Logo />

        <nav className="flex-grow">
          {menuItems.map((item) => (
            <div key={item.title} className="">
              <MenuLink key={item.title} item={item} />
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center lg:items-start space-y-6">
          <button
            className="flex items-center gap-2 md:pr-7 text-gray-300 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className=" hidden lg:inline font-mont">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
