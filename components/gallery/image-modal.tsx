import Image from "next/image"
import { auth } from "@clerk/nextjs"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { DeleteImageButton } from "@/components/gallery/delete-image-button"
import { DownloadButton } from "@/components/gallery/download-button"
import { OpenButton } from "@/components/gallery/open-button"

export const ImageModal = ({ img }: any) => {
  const { userId }: { userId: string | null } = auth()

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div key={img?.fileUrl!} className="break-inside-avoid">
          <Image
            src={img?.fileUrl!}
            alt="Ketchengut wedding."
            width={1920}
            height={1920}
            className="h-auto w-full rounded bg-white object-cover object-center shadow"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-max bg-white p-0">
        {/* <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader> */}
        <Image
          src={img?.fileUrl!}
          alt="Ketchengut wedding."
          width={1920}
          height={1920}
          className="w-screen rounded object-cover object-center shadow sm:h-[90vh] sm:w-full"
        />

        <div className="absolute left-4 top-4 flex gap-x-2.5">
          <DownloadButton fileUrl={img?.fileUrl} id={img?.id} />
          <OpenButton fileUrl={img?.fileUrl} />
          {userId === img.userId && (
            <DeleteImageButton imageId={img?.id} publicId={img?.publicId} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
