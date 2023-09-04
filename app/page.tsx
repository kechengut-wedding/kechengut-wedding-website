"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden md:container">
      <motion.section
        transition={{ delay: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-full flex-col items-center justify-center gap-y-2.5 text-center md:gap-y-10"
      >
        <h2 className="rounded-full bg-foreground px-2 py-1 text-lg uppercase text-white md:text-xl">
          August 19th 2023
        </h2>
        <h1 className="font-serif text-7xl md:text-9xl">Adriana & Johannes</h1>
        <h2 className="rounded-full bg-foreground px-2 py-1 text-lg uppercase text-white md:text-xl">
          Kechengut, Schluchsee
        </h2>
      </motion.section>

      <>
        <motion.div
          transition={{ delay: 0.3 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute left-0 top-0 -z-20 w-80 md:-top-10 md:left-64 md:w-96"
        >
          <Image
            src="/images/hero-1.webp"
            alt="Adriana and Johannes."
            width={1200}
            height={1600}
            priority
            className="h-auto w-full -rotate-12 rounded bg-white object-cover object-center p-2 shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 top-1/2 -z-10 w-72 -translate-x-1/2 -translate-y-1/2 md:w-80"
        >
          <Image
            src="/images/hero-2.webp"
            alt="Adriana and Johannes."
            width={1600}
            height={1200}
            priority
            className="h-auto w-full rounded bg-white object-cover object-center p-2 shadow-lg grayscale"
          />
        </motion.div>

        <motion.div
          transition={{ delay: 0.3 }}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 120 }}
          className="absolute -right-6 bottom-0 -z-20 w-80 md:-bottom-10 md:right-64 md:w-96"
        >
          <Image
            src="/images/hero-3.webp"
            alt="Adriana and Johannes."
            width={1200}
            height={1600}
            priority
            className="h-auto w-full rotate-12 rounded bg-white object-cover object-center p-2 shadow-lg"
          />
        </motion.div>
      </>
    </main>
  )
}
