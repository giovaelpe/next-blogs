"use server"
import { revalidatePath } from "next/cache";
import { addBlog, addLike } from "../services/blogs";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const createBlog = async(prevState:{error:string},formData:FormData) => {
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const author = formData.get('author') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    if(!author || author.length < 5){
        return {error: "Author must be present with at least 5 characters lenght"}
    }
    if(!url || url.length < 5){
        return {error: "URL must be present with at least 5 characters lenght"}
    }
    if(!title || title.length < 5){
        return {error: "Title must be present with at least 5 characters lenght"}
    }
    await addBlog({
        author,
        url,
        title,
        likes:0
    });
    revalidatePath("/blogs");
    redirect("/blogs");
}

export async function giveLike(formData:FormData){
    const id = formData.get("id")
    await addLike(Number(id));
    revalidatePath(`/blogs/${id}`, "page");
    redirect(`/blogs/${id}`);
}

export async function searchBlog(formData:FormData) {
    const title = formData.get("title") as string;
    revalidatePath("/blogs");
    redirect(`/blogs?title=${title}`);
}