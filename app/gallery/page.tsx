import type { Metadata } from "next"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { galleryImages } from "@/lib/db/schema"
import { SignInBtn } from "@/components/buttons/sign-in-btn"
import { SignOutBtn } from "@/components/buttons/sign-out-btn"
import { ImageModal } from "@/components/gallery/image-modal"
import { ImagesUpload } from "@/components/gallery/images-upload"

export const metadata: Metadata = {
  title: "Gallery",
}

export default async function GalleryPage() {
  const imgs = await db.select().from(galleryImages)

  return (
    <main className="container py-36">
      <section className="flex flex-col items-center justify-center gap-y-5">
        <h1 className="font-serif text-7xl md:text-9xl">{`Gallery`}</h1>
        <SignedIn>
          <div className="flex h-12 items-center gap-x-5">
            <ImagesUpload />
            <SignOutBtn />
          </div>
        </SignedIn>
        <SignedOut>
          <p>{`To upload your images to the gallery, please sign in.`}</p>
          <SignInBtn />
        </SignedOut>
      </section>

      <section className="mt-20">
        {imgs && imgs.length ? (
          <div className="columns-1 gap-5 sm:columns-1 lg:columns-2 lg:gap-5 xl:columns-3 [&>div:not(:first-child)]:mt-5">
            {imgs?.map((img, imgIdx) => (
              <ImageModal img={img} key={imgIdx} idx={imgIdx} />
            ))}
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
