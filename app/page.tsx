import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden">
      <section className="flex h-full flex-col items-center justify-center gap-y-2.5 text-center md:gap-y-10">
        <h2 className="rounded-full bg-foreground px-2 py-1 text-lg uppercase text-white md:text-xl">
          August 19th 2023
        </h2>
        <h1 className="font-serif text-7xl md:text-9xl">Adriana & Johannes</h1>
        <h2 className="rounded-full bg-foreground px-2 py-1 text-lg uppercase text-white md:text-xl">
          Kechengut, Schluchsee
        </h2>
      </section>

      <>
        <div className="absolute left-0 top-0 -z-20 w-52 md:-top-10 md:left-64 md:w-96">
          <Image
            src="/images/hero-1.webp"
            alt="Adriana and Johannes."
            width={1200}
            height={1600}
            priority
            className="h-auto w-full -rotate-12 rounded bg-white object-cover object-center p-2 shadow-lg"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 -z-10 w-48 -translate-x-1/2 -translate-y-1/2 md:w-80">
          <Image
            src="/images/hero-2.webp"
            alt="Adriana and Johannes."
            width={1600}
            height={1200}
            priority
            className="h-auto w-full rounded bg-white object-cover object-center p-2 shadow-lg grayscale"
          />
        </div>

        <div className="absolute -right-6 bottom-0 -z-20 w-52 md:-bottom-10 md:right-64 md:w-96">
          <Image
            src="/images/hero-3.webp"
            alt="Adriana and Johannes."
            width={1200}
            height={1600}
            priority
            className="h-auto w-full rotate-12 rounded bg-white object-cover object-center p-2 shadow-lg"
          />
        </div>
      </>
    </main>
  )
}
