import { Bitcoin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold">CryptoRadar</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <Button>
          <Link href={"/login"}>Sign In</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
