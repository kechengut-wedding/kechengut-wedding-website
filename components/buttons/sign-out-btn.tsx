import { SignOutButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const SignOutBtn = () => {
  return (
    <SignOutButton>
      <div
        className={cn(
          buttonVariants({ variant: "secondary", size: "lg" }),
          "cursor-pointer transition-all duration-200 ease-in-out"
        )}
      >
        Logout
      </div>
    </SignOutButton>
  )
}
