"use client"

import { useTransition } from "react"
import { RotateCcwIcon, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { deleteGuestbookEntry } from "@/app/_actions"

export const DeleteEntryAlert = ({ entryId }: { entryId: number }) => {
  let [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            guestbook entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                deleteGuestbookEntry(entryId)
                toast({
                  title: "Message deleted",
                  description:
                    "Your guestbook message has been successfully deleted.",
                  variant: "destructive",
                })
              })
            }
          >
            {isPending ? (
              <p className="flex items-center gap-x-1">
                <span>{`Deleting`}</span>
                <RotateCcwIcon className="h-4 w-4 animate-spin" />
              </p>
            ) : (
              <p>{`Delete`}</p>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
