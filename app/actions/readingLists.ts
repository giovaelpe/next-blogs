"use server"

import { db } from "@/db";
import { redirect } from "next//navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../services/session";
import { readingList } from "@/db/schema";

export const addBlogToReadingList = async(formData: FormData) => {
    const blogId = formData.get("blog") as string;
    const user = await getCurrentUser();
    if(!user) {
        redirect("/login");
    }
    await db.insert(readingList).values({blogId: Number(blogId), userId: user.id});
    revalidatePath(`/blogs/${blogId}`);
    redirect(`/blogs/${blogId}`);
}