"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenIcon,
  HomeIcon,
  ImageIcon,
  UploadCloudIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export const Header = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed right-4 top-4 z-20 flex gap-x-2.5 p-2.5">
      <button
        className={cn(
          pathname === "/" ? "bg-primary text-white" : "bg-white",
          "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
        )}
      >
        <Link href="/" className={cn(pathname === "/")}>
          <HomeIcon />
        </Link>
      </button>

      <button
        className={cn(
          pathname === "/gallery" ? "bg-primary text-white" : "bg-white",
          "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
        )}
      >
        <Link href="/gallery">
          <ImageIcon />
        </Link>
      </button>

      <button
        className={cn(
          pathname === "/guestbook" ? "bg-primary text-white" : "bg-white",
          "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
        )}
      >
        <Link href="/guestbook">
          <BookOpenIcon />
        </Link>
      </button>
    </nav>
  )
}
