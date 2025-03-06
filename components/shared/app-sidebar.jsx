"use client";

import {
  BadgeJapaneseYen,
  Calendar,
  ChevronUp,
  Coins,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  TrendingUpIcon,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { auth } from "@/firebase/firebase-config";
import { signOut } from "firebase/auth";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Coins",
    url: "/coins",
    icon: Coins,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: TrendingUpIcon,
  },
  {
    title: "Exchange Rate",
    url: "/converter",
    icon: BadgeJapaneseYen,
  },
];

function AppSidebar() {
  const { open } = useSidebar();
  const userData = localStorage.getItem("userInfo");

  const user = JSON.parse(userData);

  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    Cookies.remove("accessToken");
    localStorage.removeItem("userInfo");
    router.replace("/login");
  };

  function getNameBeforeAt(email) {
    const name = email?.split("@")[0];
    return name;
  }
  return (
    <Sidebar variant="" collapsible="icon" className="">
      <SidebarHeader className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="py-4">
              <a href="/dashboard" className="flex items-center gap-4 ">
                <div
                  className={`flex aspect-square items-center justify-center rounded-lg bg-gray-300 min-w-10 ${
                    open ? "w-10 h-10" : "w-10 h-10"
                  }`}
                >
                  <img
                    src="/kai.svg"
                    alt="Kaizen Logo"
                    className={`object-contain transition-all duration-200 ${
                      open ? "w-8 h-8" : "w-full h-full p-1 pr-2"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1.5 leading-none">
                  <span className="text-xl font-semibold dark:text-white text-black">
                    Kaizen
                  </span>
                  <span className="text-sm text-gray-500">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-3">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-gray-400/10 transition-colors duration-200"
                >
                  <a href={item.url} className="flex items-center gap-4 ">
                    <div className="min-w-[20px] flex items-center justify-center">
                      <item.icon
                        className="w-full h-full dark:text-white text-black"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-lg">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="px-4 py-3">
                  <User2 size={32} className="!w-[20px] !h-[20px]" />
                  <span className="text-lg ml-4">
                    {getNameBeforeAt(user?.email)}
                  </span>
                  <ChevronUp className="ml-auto size-6" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="text-base">
                  <span onClick={handleLogout} className="cursor-pointer">
                    Sign out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
