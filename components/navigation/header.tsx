"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs"
import {
  BookOpenIcon,
  HomeIcon,
  ImageIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SignInBtn } from "@/components/buttons/sign-in-btn"

export const Header = () => {
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed left-4 top-4 z-50 flex gap-x-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={cn(
                pathname === "/" ? "bg-primary text-white" : "bg-white",
                "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
              )}
            >
              <Link href="/" className={cn(pathname === "/")}>
                <HomeIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Homepage</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              className={cn(
                pathname === "/gallery" ? "bg-primary text-white" : "bg-white",
                "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
              )}
            >
              <Link href="/gallery" className={cn(pathname === "/")}>
                <ImageIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gallery</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              className={cn(
                pathname === "/guestbook"
                  ? "bg-primary text-white"
                  : "bg-white",
                "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
              )}
            >
              <Link href="/guestbook" className={cn(pathname === "/")}>
                <BookOpenIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Guestbook</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <div className="fixed right-4 top-4 z-50">
        <SignedIn>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  "cursor-pointer rounded-full border-2 border-primary bg-white p-2 transition-all duration-200 ease-in-out hover:scale-105"
                )}
              >
                <SignOutButton>
                  <LogOutIcon />
                </SignOutButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SignedIn>

        <SignedOut>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={cn(
                  pathname === "/sign-in"
                    ? "bg-primary text-white"
                    : "bg-white",
                  "cursor-pointer rounded-full border-2 border-primary p-2 transition-all duration-200 ease-in-out hover:scale-105"
                )}
              >
                <Link href="/sign-in" className={cn(pathname === "/")}>
                  <LogInIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SignedOut>
      </div>
    </>
  )
}
