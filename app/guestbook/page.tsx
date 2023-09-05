import type { Metadata } from "next"
import { currentUser, SignedIn, SignedOut } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"

import { db } from "@/lib/db"
import { guestbookEntries } from "@/lib/db/schema"
import { SignInBtn } from "@/components/buttons/sign-in-btn"
import { SignOutBtn } from "@/components/buttons/sign-out-btn"
import { DeleteEntryAlert } from "@/components/guestbook/delete-entry-alert"
import { GuestbookForm } from "@/components/guestbook/guestbook-form"
import { UpdateEntryDialog } from "@/components/guestbook/update-entry-dialog"

export const metadata: Metadata = {
  title: "Guestbook",
}
export default async function GuestbookPage() {
  const user: User | null = await currentUser()

  const entries = await db.select().from(guestbookEntries)

  const allEntries = await entries.filter((entry) => entry.userId !== user?.id)
  const userEntry = await entries.find((entry) => entry.userId === user?.id)

  return (
    <main className="container py-36">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-serif text-7xl md:text-9xl">
          Guestbook
        </h1>

        <SignedIn>
          <div className="mt-10 flex flex-col items-center gap-y-5">
            {!userEntry && (
              <GuestbookForm
                createdBy={
                  user?.firstName
                    ? `${user?.firstName} ${user?.lastName}`
                    : user?.emailAddresses[0].emailAddress
                }
              />
            )}
            <div>
              <SignOutBtn />
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="mt-10 flex flex-col items-center gap-y-5">
            <p>{`To sing the wedding's guestbook, please sign in.`}</p>
            <div>
              <SignInBtn />
            </div>
          </div>
        </SignedOut>
      </div>

      {userEntry && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-medium">Your entry</h2>
          <div className="mt-2.5">
            <span className="text-stone-500">{`${userEntry.createdBy}: `}</span>
            <span>{userEntry.body}</span>
          </div>
          <div className="mt-2 flex gap-x-2">
            <UpdateEntryDialog
              entryId={userEntry.id}
              createdBy={userEntry.createdBy!}
              body={userEntry.body!}
            />
            <DeleteEntryAlert entryId={userEntry.id} />
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-serif text-xl font-medium">
          {`All guests' entries`}
        </h2>
        {allEntries && allEntries.length === 0 ? (
          <div className="mt-2.5">{`There's no entries in the guestbook.`}</div>
        ) : (
          <>
            {allEntries.map((entry, entryIdx) => (
              <div className="mt-2.5" key={entryIdx}>
                <span className="text-stone-500">{`${entry.createdBy}: `}</span>
                <span>{entry.body}</span>
              </div>
            ))}
          </>
        )}
      </section>
    </main>
  )
}
