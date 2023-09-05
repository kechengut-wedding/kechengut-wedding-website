"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/api"
import { v2 as cloudinary } from "cloudinary"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/lib/db"
import { galleryImages, guestbookEntries } from "@/lib/db/schema"

// // const GuestbookEntrySchema = z.object({
// //   entry: z.string().min(1, { message: "Please enter a message." }),
// // })

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
})

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

export async function saveGuestbookEntry({ createdBy, entry }: any) {
  const user: User | null = await currentUser()

  try {
    await db.insert(guestbookEntries).values({
      userId: user?.id,
      body: entry,
      createdBy: createdBy,
    })

    revalidatePath("/guestbook")
    return {
      message: "Success",
    }
  } catch (error) {
    revalidatePath("/guestbook")

    return {
      error: "Something went wrong!",
    }
  }
}

export async function updateGuestbookEntry({ createdBy, entry, entryId }: any) {
  try {
    await db
      .update(guestbookEntries)
      .set({ createdBy: createdBy, body: entry })
      .where(eq(guestbookEntries.id, entryId))

    revalidatePath("/guestbook")

    return {
      message: "Success",
    }
  } catch (error) {
    revalidatePath("/guestbook")

    return {
      error: "Something went wrong!",
    }
  }
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
