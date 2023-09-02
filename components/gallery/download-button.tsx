"use client"

import { DownloadIcon } from "lucide-react"

import { downloadPhoto } from "@/lib/utils"

import { Button } from "../ui/button"

export const DownloadButton = ({
  fileUrl,
  id,
}: {
  fileUrl: string
  id: number
}) => {
  const fileExtension = fileUrl.substring(fileUrl.lastIndexOf("."))
  return (
    <Button
      size="icon"
      onClick={() => downloadPhoto(fileUrl, `${id}${fileExtension}`)}
      // className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
      title="Download fullsize version"
    >
      <DownloadIcon className="h-5 w-5" />
    </Button>
  )
}
