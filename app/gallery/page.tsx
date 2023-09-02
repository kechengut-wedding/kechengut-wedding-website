import Link from "next/link"

import { db } from "@/lib/db"
import { galleryImages } from "@/lib/db/schema"
import { ImageModal } from "@/components/gallery/image-modal"

export default async function GalleryPage() {
  const imgs = await db.select().from(galleryImages)
  return (
    <main className="py-20">
      <section className="flex flex-col items-center justify-center">
        <h1 className="font-serif text-7xl md:text-9xl">Gallery</h1>
      </section>

      <section className="mt-20">
        <div className="columns-1 gap-5 sm:columns-1 lg:columns-2 lg:gap-5 xl:columns-3 [&>div:not(:first-child)]:mt-5">
          {imgs && imgs.length ? (
            imgs.map((img, imgIdx) => <ImageModal img={img} idx={imgIdx} />)
          ) : (
            <div>
              There&apos;s no images in the gallery. Please{" "}
              <Link href="/upload">upload</Link> an image.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
