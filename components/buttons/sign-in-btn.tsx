import { SignInButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const SignInBtn = () => {
  return (
    <SignInButton afterSignInUrl="/guestbook">
      <div
        className={cn(
          buttonVariants({ variant: "secondary", size: "lg" }),
          "cursor-pointer transition-all duration-200 ease-in-out"
        )}
      >
        Log In
      </div>
    </SignInButton>
  )
}
