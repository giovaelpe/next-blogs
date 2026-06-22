CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"author" text NOT NULL,
	"likes" numeric DEFAULT '0' NOT NULL
);
