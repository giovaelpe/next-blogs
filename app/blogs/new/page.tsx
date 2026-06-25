"use client"

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

export default function NewBlog() {
    const [state, formAction] = useActionState(createBlog, {error: ""});
    return (
        <div>
            <h2>Add new blog</h2>
            <form action={formAction}>
                <input type="text" name="author" placeholder="Author" required minLength={5} />
                <input type="url" name="url" placeholder="URL" required minLength={5} />
                <input type="text" name="title" placeholder="Title" required minLength={5} />
                <input type="submit" value="Add" />
            </form>
            {
                state.error && <p style={{color:"red"}}>{state.error}</p>
            }
        </div>
    );
}