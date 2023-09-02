"use client"

import { signIn, signOut } from "next-auth/react"

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brand-google"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#2c3e50"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
    </svg>
  )
}

export function SignOut() {
  return (
    <button
      className="mb-6 mt-2 text-xs text-neutral-700 dark:text-neutral-300"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  )
}

export function SignIn() {
  return (
    <button
      className="mb-8 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-3 py-2 text-sm leading-4 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
      onClick={() => signIn("google")}
    >
      <GoogleIcon />
      <div className="ml-3">Sign in with Google</div>
    </button>
  )
}
