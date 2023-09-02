"use client"

import { useRef, useState } from "react"
import { Edit2Icon } from "lucide-react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { updateGuestbookEntry } from "@/app/_actions"

export const UpdateEntryDialog = ({
  entryId,
  body,
}: {
  entryId: number
  body: string
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Edit2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your entry</DialogTitle>
          <DialogDescription>
            Make changes to your guestbook message. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <form
          style={{ opacity: !pending ? 1 : 0.7 }}
          className="relative"
          ref={formRef}
          action={async (formData) => {
            await updateGuestbookEntry({ formData, entryId })
            formRef.current?.reset()
            setOpen(false)
          }}
        >
          <Input id="entry" name="entry" defaultValue={body} />
          <DialogFooter>
            <Button type="submit" className="mt-4">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
