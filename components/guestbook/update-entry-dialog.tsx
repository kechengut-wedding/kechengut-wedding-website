"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2Icon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast, useToast } from "@/components/ui/use-toast"
import { updateGuestbookEntry } from "@/app/_actions"

const FormSchema = z.object({
  createdBy: z.string().nonempty("Name is required."),
  entry: z
    .string()
    .nonempty("Message is required.")
    .min(6, { message: "Message must be at least 6 characters." }),
})

type Inputs = z.infer<typeof FormSchema>

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

  const form = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      createdBy: createdBy,
      entry: body,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
    // // reset()
    // // setData(result.data)
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
              <Button type="submit" className="mt-4">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
