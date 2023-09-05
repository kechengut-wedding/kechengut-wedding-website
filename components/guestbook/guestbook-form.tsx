"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

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

const FormSchema = z.object({
  createdBy: z.string().nonempty("Name is required."),
  entry: z
    .string()
    .nonempty("Message is required.")
    .min(6, { message: "Message must be at least 6 characters." }),
})

type Inputs = z.infer<typeof FormSchema>

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

  const form = useForm<Inputs>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      createdBy: createdBy,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { createdBy, entry } = data

    const result = await saveGuestbookEntry({ createdBy, entry })
    console.log(result)
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
    // // if (result.error) {
    // //   toast({
    // //     title: "Error",
    // //     description: result.error,
    // //   })
    // // }
    // // reset()
    // // setData(result.data)
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
