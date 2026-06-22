import { numeric, pgTable, serial, text } from "drizzle-orm/pg-core";


export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    author: text("author").notNull(),
    likes: numeric("likes").notNull().default("0")
})