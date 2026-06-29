"use server"

import { db } from "@/db";
import { redirect } from "next//navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../services/session";
import { readingList } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export const markAsRead = async(formData: FormData) => {
    const id = formData.get("id") as string;
    await db.update(readingList).set({read: true}).where(eq(readingList.id, Number(id)));
    revalidatePath("/me");
    redirect("/me");
}