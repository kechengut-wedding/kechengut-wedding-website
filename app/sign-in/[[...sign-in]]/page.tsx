import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="mx-auto grid h-screen max-w-7xl place-content-center place-items-center">
      <SignIn />
    </div>
  )
}
