"use server"
import { revalidatePath } from "next/cache";
import { addBlog } from "../services/blogs";
import { redirect } from "next/navigation";

export const createBlog = async(formData:FormData) => {
    const author = formData.get('author') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    addBlog({
        author,
        url,
        title,
        likes:0
    });
    revalidatePath("/blogs");
    redirect("/blogs");
}