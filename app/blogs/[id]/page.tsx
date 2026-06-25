import { giveLike } from "@/app/actions/blogs";
import { getOneBlog } from "@/app/services/blogs";
import { notFound } from "next/navigation";


export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getOneBlog(Number(id));
    if (!blog) {
        notFound();
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            <h3>Author: {blog.author}</h3>
            <h3>URL: {blog.url}</h3>
            <h4>Likes: {blog.likes}</h4>
            <form action={giveLike}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">give like</button>
            </form>
        </div>
    )
}