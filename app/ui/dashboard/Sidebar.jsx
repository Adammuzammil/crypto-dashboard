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
import { redirect } from "next/navigation";

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
    className="flex items-center py-5 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
  >
    <span className="mr-4">{item.icon}</span>
    <span className="hidden lg:inline">{item.title}</span>
  </Link>
);

const Sidebar = () => {
  const { user } = useAuth();
  const isLoggedIn = user?.accessToken;

  if (!isLoggedIn) {
    redirect("/login");
  }

  // console.log(user);
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <div className="bg-gray-800 text-white h-screen w-16 lg:w-52 transition-all duration-300 ease-in-out flex flex-col">
      <div className="flex flex-col items-center h-full py-6 px-4">
        <Link
          href="/dashboard"
          className="mb-6 text-center flex items-center justify-center lg:justify-start gap-2 p-4"
        >
          <LuRadar size={22} />
          <span className="text-xl font-semibold hidden lg:inline">
            CryptoRadar
          </span>
        </Link>

        <nav className="flex-grow">
          {menuItems.map((item) => (
            <div key={item.title} className="">
              <MenuLink key={item.title} item={item} />
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center lg:items-start space-y-6 -ml-2">
          <button
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span className=" hidden lg:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
