"use client"

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const errorStyle = {
    color: "red"
}

export default function NewBlog() {
    const [state, formAction] = useActionState(createBlog, {errors: {}, values:{author:"", url:"", title:""}});
    return (
        <div>
            <h2>Add new blog</h2>
            <form action={formAction}>
                <input type="text" name="author" placeholder="Author" defaultValue={state.values.author} />
                {
                    state.errors.author && <p style={errorStyle}>{state.errors.author}</p>
                }
                <input type="url" name="url" placeholder="URL" defaultValue={state.values.url} />
                {
                    state.errors.url && <p style={errorStyle}>{state.errors.url}</p>
                }
                <input type="text" name="title" placeholder="Title" defaultValue={state.values.title} />
                {
                    state.errors.title && <p style={errorStyle}>{state.errors.title}</p>
                }
                <input type="submit" value="Add" />
            </form>
        </div>
    );
}