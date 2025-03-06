import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { menuItems } from "./Sidebar";
import MenuLink from "./MenuLink";

const MobileMenu = () => {
  return (
    <div className="md:hidden flex flex-col items-center">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div>
        {menuItems.map((cat) => (
          <div key={cat.title}>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
