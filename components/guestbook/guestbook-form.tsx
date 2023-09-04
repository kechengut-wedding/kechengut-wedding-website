"use client"

import { useRef } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { saveGuestbookEntry } from "@/app/_actions"

export const GuestbookForm = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <form
      style={{ opacity: !pending ? 1 : 0.7 }}
      className="relative mt-4"
      ref={formRef}
      action={async (formData) => {
        const result = await saveGuestbookEntry(formData)

        if (result?.error) {
          toast({
            title: "Something went wrong",
            description: result.error,
          })
        } else {
          toast({ title: "Success", description: "Guestbook message added." })
        }

        formRef.current?.reset()
      }}
    >
      <div className="flex w-full items-center gap-x-2">
        <Input
          id="entry"
          name="entry"
          type="text"
          placeholder="Your message..."
          className="w-40 bg-white md:w-96"
        />
        <Button type="submit">Submit</Button>
      </div>

      {/* <Input
        aria-label="Your message"
        placeholder="Your message..."
        disabled={pending}
        name="entry"
        type="text"
        required
        className="mt-1 block w-full rounded-md border-neutral-300 bg-gray-100 py-2 pl-4 pr-32 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100"
      />

      <Button>x</Button> */}
      {/* <button
        className="absolute right-1 top-1 flex h-8 w-16 items-center justify-center rounded bg-neutral-200 px-2 py-1 font-medium text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
        disabled={pending}
        type="submit"
      >
        Sign
      </button> */}
    </form>
  )
}
