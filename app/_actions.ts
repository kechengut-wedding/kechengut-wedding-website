"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { v2 as cloudinary } from "cloudinary"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { galleryImages, guestbookEntries } from "@/lib/db/schema"

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
})

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "kechengut_wedding" },
    cloudinaryConfig.api_secret!
  )

  return { timestamp, signature }
}

// // export async function saveImageToDatabase({
// //   public_id,
// //   version,
// //   signature,
// //   secure_url,
// // }: any) {
// //   const user: User | null = await currentUser()

// //   // verify the data
// //   const expectedSignature = cloudinary.utils.api_sign_request(
// //     { public_id, version },
// //     cloudinaryConfig.api_secret as string
// //   )

// //   // // console.log(public_id)

// //   if (expectedSignature === signature) {
// //     await db.insert(galleryImages).values({
// //       fileUrl: secure_url,
// //       userId: user?.id,
// //       createdBy: `${user?.firstName} ${user?.lastName}`,
// //       email: user?.emailAddresses[0].emailAddress,
// //       publicId: public_id,
// //     })

// //     redirect("/gallery")
// //   }
// // }

export async function saveImageToDatabase(result: any) {
  const user: User | null = await currentUser()

  await db.insert(galleryImages).values({
    fileUrl: result?.info.secure_url,
    userId: user?.id,
    createdBy: `${user?.firstName} ${user?.lastName}`,
    email: user?.emailAddresses[0].emailAddress,
    publicId: result?.info.public_id,
  })

  revalidatePath("/gallery")
}

export async function deleteImageFromDatabase({
  public_id,
  version,
  signature,
  secure_url,
}: any) {
  const user: User | null = await currentUser()

  // verify the data
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret as string
  )

  // // console.log(public_id)

  if (expectedSignature === signature) {
    await db.insert(galleryImages).values({
      fileUrl: secure_url,
      userId: user?.id,
      createdBy: `${user?.firstName} ${user?.lastName}`,
      email: user?.emailAddresses[0].emailAddress,
      publicId: public_id,
    })

    redirect("/gallery")
  }
}

export async function saveGuestbookEntry(formData: FormData) {
  const user: User | null = await currentUser()
  const email = user?.emailAddresses[0].emailAddress as string
  const createdBy = `${user?.firstName} ${user?.lastName}` as string
  const entry = formData.get("entry")?.toString() || ""
  const body = entry.slice(0, 500)

  try {
    await db.insert(guestbookEntries).values({
      userId: user?.id,
      body: body,
      email: email,
      createdBy: createdBy,
    })
  } catch (error) {
    return {
      error: "Something went wrong!",
    }
  }

  revalidatePath("/guestbook")
}

export async function updateGuestbookEntry({
  formData,
  entryId,
}: {
  formData: FormData
  entryId: number
}) {
  const user: User | null = await currentUser()

  // // console.log(JSON.stringify(formData, null, 2))

  const entry = formData.get("entry")?.toString() || ""
  const body = entry.slice(0, 500)

  await db
    .update(guestbookEntries)
    .set({ body: body })
    .where(eq(guestbookEntries.id, entryId))

  revalidatePath("/guestbook")

  // //   const data = await fetch("https://api.resend.com/emails", {
  // //     method: "POST",
  // //     headers: {
  // //       Authorization: `Bearer ${process.env.RESEND_SECRET}`,
  // //       "Content-Type": "application/json",
  // //     },
  // //     body: JSON.stringify({
  // //       from: "guestbook@leerob.io",
  // //       to: "me@leerob.io",
  // //       subject: "New Guestbook Entry",
  // //       html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
  // //     }),
  // //   })

  // //   const response = await data.json()
  // //   console.log("Email sent", response)
}

export async function deleteGuestbookEntry(entryId: number) {
  await db.delete(guestbookEntries).where(eq(guestbookEntries.id, entryId))

  revalidatePath("/guestbook")
}

export async function deleteGalleryImage({
  imageId,
  publicId,
}: {
  imageId: number
  publicId: string
}) {
  await db.delete(galleryImages).where(eq(galleryImages.id, imageId))
  await cloudinary.uploader
    .destroy(publicId)
    .then((result) => console.log(result))
  revalidatePath("/gallery")
}
