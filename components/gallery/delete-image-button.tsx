"use client"

import { useTransition } from "react"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { deleteGalleryImage } from "@/app/_actions"

export const DeleteImageButton = ({
  imageId,
  publicId,
}: {
  imageId: number
  publicId: string
}) => {
  let [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={() =>
        startTransition(() => {
          deleteGalleryImage({ publicId, imageId })
        })
      }
    >
      <Trash2Icon className="h-5 w-5" />
    </Button>
  )
}
