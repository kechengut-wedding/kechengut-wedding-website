import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { Edit2Icon, Trash2Icon } from "lucide-react"

import { db } from "@/lib/db"
import { guestbookEntries } from "@/lib/db/schema"
import { Button, buttonVariants } from "@/components/ui/button"
import { DeleteEntryAlert } from "@/components/guestbook/delete-entry-alert"
import { GuestbookForm } from "@/components/guestbook/guestbook-form"
import { UpdateEntryDialog } from "@/components/guestbook/update-entry-dialog"

export default async function GuestbookPage() {
  const user: User | null = await currentUser()

  const entries = await db.select().from(guestbookEntries)

  const allEntries = await entries.filter((entry) => entry.userId !== user?.id)
  const userEntry = await entries.find((entry) => entry.userId === user?.id)

  return (
    <main className="py-20">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-serif text-7xl md:text-9xl">
          Guestbook
        </h1>

        <SignedIn>
          {!userEntry && <GuestbookForm />}

          <Button className="mt-5" variant="secondary">
            <SignOutButton>Logout</SignOutButton>
          </Button>

          {/* <div className="mt-4">
          <form>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" id="message" placeholder="Your message..." />
              <Button type="submit">Sign</Button>
            </div>
          </form>
        </div> */}
        </SignedIn>

        <SignedOut>
          <SignInButton afterSignInUrl="/guestbook">
            <div className={buttonVariants({ variant: "secondary" })}>
              Sign in
            </div>
          </SignInButton>
        </SignedOut>
      </div>

      {/* <h2 className="mt-10 font-serif text-5xl">Leave your message</h2> */}

      {userEntry && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-medium">Your entry</h2>
          <div className="mt-2.5">
            <span className="text-stone-500">
              {`${userEntry.createdBy ?? userEntry.email}: `}
            </span>
            <span>{userEntry.body}</span>
          </div>
          <div className="mt-2 flex gap-x-2">
            <UpdateEntryDialog entryId={userEntry.id} body={userEntry.body!} />
            <DeleteEntryAlert entryId={userEntry.id} />
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-xl font-medium">
          All guests&apos; entries
        </h2>
        {allEntries && allEntries.length === 0 ? (
          <div className="mt-2.5">
            There&apos;s no entries in the guestbook.
          </div>
        ) : (
          <>
            {allEntries.map((entry) => (
              <div className="mt-2.5">
                <span className="text-stone-500">
                  {`${entry.createdBy ?? entry.email}: `}
                </span>
                <span>{entry.body}</span>
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  )
}
