CREATE TABLE `galleryImages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`fileUrl` text,
	`userId` text,
	CONSTRAINT `galleryImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guestbookEntries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` text,
	`createdBy` text,
	`email` text,
	`body` text,
	CONSTRAINT `guestbookEntries_id` PRIMARY KEY(`id`)
);
