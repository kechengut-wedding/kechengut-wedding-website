import "@/app/globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import { ClerkProvider } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/navigation/header"

export const metadata: Metadata = {
  title: {
    default: "Adriana & Johannes",
    template: "%s | Adriana & Johannes",
  },
  description:
    "A digital gallery and guestbook for the wedding of Adriana and Johannes at Kechengut.",
  openGraph: {
    title: "Adriana & Johannes",
    description:
      "A digital gallery and guestbook for the wedding of Adriana and Johannes at Kechengut.",
    url: "https://adriana-and-johannes.vercel.app",
    siteName: "Adriana & Johannes",
    images: [
      {
        url: "https://adriana-and-johannes.vercel.app/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
          <Toaster />
          <Header />
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  )
}
