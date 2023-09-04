"use client"

import { useUser } from "@clerk/nextjs"
import { CldUploadButton } from "next-cloudinary"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { saveImageToDatabase } from "@/app/_actions"

export const ImagesUpload = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div
      className={cn(
        buttonVariants({ variant: "default", size: "lg" }),
        "cursor-pointer transition-all duration-200 ease-in-out"
      )}
    >
      <CldUploadButton
        onSuccess={async (result: any) => {
          saveImageToDatabase(result)

          // setTimeout(() => {
          //   router.refresh()
          // }, 2000)
        }}
        uploadPreset="ks27f6gw"
      />
    </div>
  )
}
