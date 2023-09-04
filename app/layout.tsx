import "./globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Header } from "@/components/navigation/header"

export const metadata: Metadata = {
  title: {
    default: "Adriana & Johannes",
    template: "%s | Adriana & Johannes",
  },
  description:
    "A digital gallery and guestbook for the wedding of Adriana and Johannes at Kechengut.",
}

const abalos = localFont({
  src: [
    {
      path: "../public/fonts/abalos/hairline.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/abalos/regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/abalos/semibold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/abalos/extrabold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-abalos",
})

const jubilee = localFont({
  src: [
    {
      path: "../public/fonts/jubilee/silver.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-jubilee",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(jubilee.variable, abalos.variable, "font-sans")}>
          <Header />
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
