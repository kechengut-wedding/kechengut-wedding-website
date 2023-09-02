import { ExternalLinkIcon } from "lucide-react"

import { Button } from "../ui/button"

export const OpenButton = ({ fileUrl }: { fileUrl: string }) => {
  return (
    <Button asChild size="icon">
      <a target="_blank" href={fileUrl}>
        <ExternalLinkIcon className="h-5 w-5" />
      </a>
    </Button>
  )
}
