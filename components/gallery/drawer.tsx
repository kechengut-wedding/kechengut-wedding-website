"use client"

import Image from "next/image"
import { Drawer } from "vaul"

export const ImageDrawer = ({ img }: { img: any }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <div
          key={img?.fileUrl!}
          className="relative aspect-auto break-inside-avoid"
        >
          <Image
            src={img?.fileUrl!}
            alt="Ketchengut wedding."
            width={1920}
            height={1920}
            className="h-auto w-full rounded object-cover object-center shadow"
          />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content>
          <div key={img?.fileUrl!}>
            <Image
              src={img?.fileUrl!}
              alt="Ketchengut wedding."
              width={1920}
              height={1920}
              className="h-auto w-full rounded object-cover object-center shadow"
            />
          </div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  )
}
