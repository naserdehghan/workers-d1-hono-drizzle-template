CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`fist_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);