import { SignIn } from "@clerk/nextjs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
}

export default function SignInPage() {
  return (
    <div className="mx-auto grid h-screen max-w-7xl place-content-center place-items-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            formFieldInput:
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-branding-green",
            footerActionLink: "text-primary font-bold hover:text-primary/90",
            headerTitle: "font-serif",
          },
          layout: {
            //   logoImageUrl: 'https://clerk.dev/logo.png',
            logoPlacement: "inside",
            showOptionalFields: true,
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
            //   helpPageUrl: 'https://clerk.dev/support',
            //   privacyPageUrl: 'https://clerk.dev/privacy',
            //   termsPageUrl: 'https://clerk.dev/terms',
          },
        }}
      />
    </div>
  )
}
