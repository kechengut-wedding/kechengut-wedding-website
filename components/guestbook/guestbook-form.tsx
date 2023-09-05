"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { RotateCcwIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"

import { GuestbookFormInputs, GuestbookFormSchema } from "@/lib/zod-schemas"
// // import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
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
import { saveGuestbookEntry } from "@/app/_actions"

export const GuestbookForm = ({ createdBy }: any) => {
  // // const [data, setData] = useState<Inputs>()
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // // if (!isLoaded || !isSignedIn) {
  // //   return null
  // // }

  // // const {
  // //   register,
  // //   handleSubmit,
  // //   watch,
  // //   reset,
  // //   formState: { errors },
  // // } = useForm<Inputs>({
  // //   resolver: zodResolver(FormDataSchema),
  // // })

  const form = useForm<GuestbookFormInputs>({
    resolver: zodResolver(GuestbookFormSchema),
    defaultValues: {
      createdBy: createdBy,
    },
  })

  const onSubmit: SubmitHandler<GuestbookFormInputs> = async (data) => {
    if (submitting) {
      return false
    }
    setSubmitting(true)

    const { createdBy, entry } = data

    const result = await saveGuestbookEntry({ createdBy, entry })

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

        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <p className="flex items-center gap-x-1">
              <span>{`Submitting`}</span>
              <RotateCcwIcon className="h-4 w-4 animate-spin" />
            </p>
          ) : (
            <p>{`Submit`}</p>
          )}
        </Button>
      </form>
    </Form>
  )
}
