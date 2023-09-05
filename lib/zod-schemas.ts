import { z } from "zod"

export const GuestbookFormSchema = z.object({
  createdBy: z
    .string({
      required_error: "Please enter your name.",
    })
    .nonempty("Please enter your name.")
    .min(1, { message: "Your name must be at least 1 character long." }),
  entry: z
    .string({
      required_error: "Please enter your message.",
    })
    .min(6, { message: "Your message must be at least 6 characters long." }),
})

export type GuestbookFormInputs = z.infer<typeof GuestbookFormSchema>
