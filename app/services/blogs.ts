import {blogs, users} from "../../db/schema";
import {db} from "../../db/index";
import { eq, like, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getCurrentUser } from "./session";


type NewBlogEntry = {
    title: string,
    url: string,
    author: string,
    likes: number
}

export const getBlogs = async() => (await db.query.blogs.findMany()).sort((a,b) => Number(b.likes) - Number(a.likes));

export const getOneBlog = async (id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    })
}

export const addBlog = async(newBlog: NewBlogEntry) => {
    const user = await getCurrentUser();
    if(!user){
        throw new Error("Not logged in")
    }
    await db.insert(blogs).values({title: newBlog.title, url: newBlog.url, author: newBlog.author, userId: user.id});
} 

export const addLike = async(id:number) => {
    const blog = await db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    });
    if(blog){
        await db.update(blogs)
        .set({likes: (Number(blog.likes)+1).toString()})
        .where(eq(blogs.id, id))
    }
} 

export const searchBlogByTitle = async(title:string) => {
    return await db.select().from(blogs)
    .where(like(blogs.title, `%${title}%`));
}