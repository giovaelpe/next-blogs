"use server"
import { revalidatePath } from "next/cache";
import { addBlog, getOneBlog } from "../services/blogs";
import { notFound, redirect } from "next/navigation";

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

export async function giveLike(formData:FormData){
    const id = formData.get("id") as string;
    const blog = getOneBlog(Number(id));
    if(!blog){
        notFound();
    }
    blog.likes = blog.likes+1;
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.id}`)
    redirect(`/blogs/${id}`)
}

export async function searchBlog(formData:FormData) {
    const title = formData.get("title") as string;
    revalidatePath("/blogs");
    redirect(`/blogs?title=${title}`);
}