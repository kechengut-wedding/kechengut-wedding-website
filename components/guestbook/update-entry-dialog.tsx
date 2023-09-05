"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2Icon, RotateCcwIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"

import { GuestbookFormInputs, GuestbookFormSchema } from "@/lib/zod-schemas"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { updateGuestbookEntry } from "@/app/_actions"

export const UpdateEntryDialog = ({
  entryId,
  createdBy,
  body,
}: {
  entryId: number
  createdBy: string
  body: string
}) => {
  const [open, setOpen] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<GuestbookFormInputs>({
    resolver: zodResolver(GuestbookFormSchema),
    defaultValues: {
      createdBy: createdBy,
      entry: body,
    },
  })

  const onSubmit: SubmitHandler<GuestbookFormInputs> = async (data) => {
    if (submitting) {
      return false
    }
    setSubmitting(true)

    const { createdBy, entry } = data

    const result = await updateGuestbookEntry({ createdBy, entry, entryId })

    setOpen(false)

    if (!result) {
      toast({
        title: "Error",
        description: "Something went wrong.",
      })
    } else {
      toast({
        title: "Sucess!",
        description: "Your message was created.",
      })
    }

    setSubmitting(false)
  }

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative mt-4 flex w-96 flex-col gap-y-5"
          >
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the guest" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message to the bride and groom."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="mt-4" disabled={submitting}>
                {submitting ? (
                  <p className="flex items-center gap-x-1">
                    <span>{`Saving`}</span>
                    <RotateCcwIcon className="h-4 w-4 animate-spin" />
                  </p>
                ) : (
                  <p>{`Save`}</p>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
