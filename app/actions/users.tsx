"use server"

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq, like } from "drizzle-orm";
import { redirect } from "next//navigation";
import { revalidatePath } from "next/cache";
import {v4 as uuid} from "uuid";

export const registerUser = async (prevState: { errors: object, values: object }, formData: FormData) => {
    const username = (formData.get("username") as string).trim();
    const name = (formData.get("name") as string).trim();
    const password = formData.get("password") as string;

    const errors: Record<string, string> = {}

    if (!username || username.length < 4) {
        errors.username = "Username required and must be at least 4 characters long";
    }
    const usernameExist = await db.query.users.findFirst({
        where: eq(users.username, username)
    })
    console.log(usernameExist);
    if (usernameExist) {
        errors.username = "Username already in use"
    }
    if (!name) {
        errors.name = "Name is required"
    }
    if (!password || password.length < 4) {
        errors.password = "Password required and must be at least 4 characters long";
    }

    if (Object.keys(errors).length > 0) {
        return { errors, values: { username, name } }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ name, username, passwordHash });

    redirect("/login");
}

export const generateToken = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const newToken = uuid();
    await db.update(users).set({token: newToken}).where(eq(users.username, username));
    revalidatePath("/me");
    redirect("/me");
}