import { relations } from "drizzle-orm";
import { numeric, pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";


export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    author: text("author").notNull(),
    likes: numeric("likes").notNull().default("0"),
    userId: integer("user_id").notNull().references(() => users.id)
})

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull().default(""),
    token: text("token")
})

export const readingList = pgTable("reading_list", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    blogId: integer("blog_id").notNull().references(() => blogs.id),
    read: boolean("read").notNull().default(false),
})



export const userRelations = relations(users, ({many}) => ({
    blogs: many(blogs),
    readingList: many(readingList)
}));

export const blogRelations = relations(blogs, ({one}) => ({
    user: one(users, {
        fields: [blogs.userId],
        references: [users.id]
    })
}));

export const readingListRelations = relations(readingList, ({one}) => ({
    user: one(users, {
        fields: [readingList.userId],
        references: [users.id]
    }),
    blog: one(blogs, {
        fields: [readingList.blogId],
        references: [blogs.id]
    })
}))
