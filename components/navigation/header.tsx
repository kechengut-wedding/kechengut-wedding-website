import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import {
  BookOpenIcon,
  HomeIcon,
  ImageIcon,
  UploadCloudIcon,
} from "lucide-react"

import { Button } from "../ui/button"

export const Header = () => {
  return (
    <nav className="fixed right-4 top-4 z-20 flex gap-x-2.5">
      {/* <ul className="container flex justify-center gap-x-10 text-xl">
        <Link href="/">Our Story</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/guestbook">Guestbook</Link>
      </ul> */}

      {/* <UserButton afterSignOutUrl="/" /> */}

      <Button size="icon">
        <Link href="/">
          <HomeIcon />
        </Link>
      </Button>

      <Button size="icon">
        <Link href="/gallery">
          <ImageIcon />
        </Link>
      </Button>

      <Button size="icon">
        <Link href="/upload">
          <UploadCloudIcon />
        </Link>
      </Button>

      <Button size="icon">
        <Link href="/guestbook">
          <BookOpenIcon />
        </Link>
      </Button>
    </nav>
  )
}
