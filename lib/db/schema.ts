import { relations } from "drizzle-orm"
import { int, mysqlTable, serial, text } from "drizzle-orm/mysql-core"

// // export const users = mysqlTable("users", {
// //   id: serial("id").primaryKey(),
// //   clerkId: text("clerkId"),
// //   firstName: text("firstName"),
// //   lastName: text("lastName"),
// //   email: text("email"),
// // })

export const guestbookEntries = mysqlTable("guestbookEntries", {
  id: serial("id").primaryKey(),
  userId: text("userId"),
  createdBy: text("createdBy"),
  body: text("body"),
})

export const galleryImages = mysqlTable("galleryImages", {
  id: serial("id").primaryKey(),
  fileUrl: text("fileUrl"),
  userId: text("userId"),
  createdBy: text("createdBy"),
  email: text("email"),
  publicId: text("publicId"),
})

// // export const userRelations = relations(users, ({ one }) => ({
// //   message: one(messages, {
// //     fields: [users.id],
// //     references: [messages.userId],
// //   }),
// // }))

// // export const messagesRelations = relations(messages, ({ one }) => ({
// //   user: one(users, {
// //     fields: [messages.user_id],
// //     references: [users.id],
// //   }),
// // }))
