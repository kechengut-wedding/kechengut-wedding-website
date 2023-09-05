"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useAnimate, usePresence } from "framer-motion"

export const ImageCard = ({ img, idx }: { img: any; idx: number }) => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [0, 1] },
          { duration: 0.5, delay: 0.1 * idx }
        )
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [1, 0] },
          { duration: 0.5, delay: 0.1 * idx }
        )
        safeToRemove()
      }
      exitAnimation()
    }
  })

  return (
    // // <motion.div
    <div
      // //   transition={{ delay: 0.1 * idx }}
      // //   initial={{ opacity: 0, y: 20 }}
      // //   animate={{ opacity: 1, y: 0 }}
      // //   exit={{ opacity: 0, y: 20 }}
      ref={scope}
      key={idx}
      className="break-inside-avoid"
    >
      <Image
        src={img?.fileUrl!}
        alt="Ketchengut wedding."
        width={1920}
        height={1920}
        className="h-auto w-full rounded bg-white object-cover object-center shadow"
      />
    </div>
    // // </motion.div>
  )
}
