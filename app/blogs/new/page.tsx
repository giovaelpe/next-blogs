"use client"

import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const errorStyle = {
    color: "red"
}

export default function NewBlog() {
    const [state, formAction] = useActionState(createBlog, {errors: {}, values:{author:"", url:"", title:""}, success:false});
    const {showNotification} = useNotification();
    const router = useRouter();
    useEffect(() => {
        if(state.success){
            showNotification("Blog created")
            router.push("/blogs");
        }
    },[state, showNotification, router])
    return (
        <div>
            <h2>Add new blog</h2>
            <form action={formAction}>
                <input type="text" name="author" placeholder="Author" defaultValue={state.values.author} className="bg-amber-50 m-3.5 text-black" />
                {
                    state.errors.author && <p style={errorStyle}>{state.errors.author}</p>
                }
                <input type="url" name="url" placeholder="URL" defaultValue={state.values.url} className="bg-amber-50 m-3.5 text-black" />
                {
                    state.errors.url && <p style={errorStyle}>{state.errors.url}</p>
                }
                <input type="text" name="title" placeholder="Title" defaultValue={state.values.title} className="bg-amber-50 m-3.5 text-black" />
                {
                    state.errors.title && <p style={errorStyle}>{state.errors.title}</p>
                }
                <input type="submit" value="Add" className="bg-gray-600 p-1.5 m-1 rounded-2xl" />
            </form>
        </div>
    );
}