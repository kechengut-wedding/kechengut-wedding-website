import type { Metadata } from "next"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { sql } from "drizzle-orm"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { db } from "@/lib/db"
import { galleryImages } from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignInBtn } from "@/components/buttons/sign-in-btn"
import { SignOutBtn } from "@/components/buttons/sign-out-btn"
import { ImageModal } from "@/components/gallery/image-modal"
import { ImagesUpload } from "@/components/gallery/images-upload"

export const metadata: Metadata = {
  title: "Gallery",
}

interface GalleryPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1

  // amount of documents you want to return in the query
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10

  // amount of documents you want to skip
  const skip = (page - 1) * limit

  const imgs = await db.select().from(galleryImages).limit(limit).offset(skip)

  const totalImgs = await db
    .select({ count: sql<number>`count(*)` })
    .from(galleryImages)

  const totalPages = Math.ceil(totalImgs[0].count / limit)
  return (
    <main className="container py-32">
      <section className="flex flex-col items-center justify-center gap-y-5">
        <h1 className="font-serif text-7xl md:text-9xl">{`Gallery`}</h1>
        <SignedIn>
          <div className="flex h-12 items-center gap-x-5">
            <ImagesUpload />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex gap-x-1">
            <p>{`To upload your images to the gallery, please `}</p>
            <SignInButton afterSignInUrl="/gallery">
              <span className="cursor-pointer font-bold hover:underline">{`sign in.`}</span>
            </SignInButton>
          </div>
        </SignedOut>
      </section>

      <section className="mt-20">
        {imgs && imgs.length ? (
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center gap-x-2.5 md:gap-x-5">
              <Link
                href={`/gallery?page=${page > 1 ? page - 1 : 1}`}
                // // href={{
                // //   pathname: '/movies',
                // //   query: {
                // //     ...(search ? { search } : {}),
                // //     page: page > 1 ? page - 1 : 1
                // //   }
                // // }}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  page <= 1 && "pointer-events-none opacity-50"
                )}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Link>

              <div className="tabular-nums">{`${page} of ${totalPages}`}</div>
              <Link
                href={`/gallery?page=${page + 1}`}
                // // href={{
                // //   pathname: '/movies',
                // //   query: {
                // //     ...(search ? { search } : {}),
                // //     page: page + 1
                // //   }
                // // }}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  imgs.length < 10 && "pointer-events-none opacity-50"
                )}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-5 xl:columns-4 [&>div:not(:first-child)]:mt-5">
              {imgs?.map((img, imgIdx) => (
                <ImageModal img={img} key={imgIdx} idx={imgIdx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            {`There's no images in the gallery.`}
          </div>
        )}
      </section>
    </main>
  )
}
