"use server"
import { revalidatePath } from "next/cache";
import { addBlog, getOneBlog, addLike } from "../services/blogs";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const createBlog = async(formData:FormData) => {
    const session = await auth();
    if(!session){
        redirect("/login")
    }
    const author = formData.get('author') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
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