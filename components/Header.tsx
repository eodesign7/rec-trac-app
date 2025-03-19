"use client";
// cSpell:disable

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BringToFront } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "flex items-center justify-between p-4",
        isHomePage ? "border-b border-blue-500" : "bg-blue-500",
      )}
    >
      <Link href="/" className="flex gap-2 items-center">
        <BringToFront className="-rotate-45 text-blue-600" />
        <h1 className="text-lg font-semibold">RecTrack</h1>
      </Link>

      <div className="flex items-center space-x-4">
        <SignedIn>
          <Link href="/receipts">
            <Button variant="outline">Receipts</Button>
          </Link>
          <Link href="/manage-plan">
            <Button variant="outline">Manage Plan</Button>
          </Link>

          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
