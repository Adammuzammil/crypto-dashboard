import React from "react";

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
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard size={22} />,
      },
      {
        title: "Users",
        path: "/coins",
        icon: <MdSupervisedUserCircle size={22} />,
      },
      {
        title: "Trending",
        path: "/trending",
        icon: <MdShoppingBag size={22} />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
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
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings size={22} />,
      },
    ],
  },
];

const MenuLink = ({ item }) => (
  <Link
    href={item.path}
    className="flex items-center py-4 text-gray-300 hover:text-white transition-colors"
  >
    <span className="mr-2">{item.icon}</span>
    <span className="hidden lg:inline">{item.title}</span>
  </Link>
);

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-16 lg:w-64 transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full py-6 px-4">
        <Link href="/dashboard" className="mb-8 text-center">
          <span className="text-2xl font-bold">Logo</span>
        </Link>

        <nav className="flex-grow">
          {menuItems.map((category) => (
            <div key={category.title} className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 hidden lg:block">
                {category.title}
              </h3>
              {category.list.map((item) => (
                <MenuLink key={item.title} item={item} />
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center lg:items-start space-y-6">
          <button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <User size={20} />
            <span className="ml-2 hidden lg:inline">Profile</span>
          </button>
          <button className="flex items-center text-gray-300 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="ml-2 hidden lg:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
