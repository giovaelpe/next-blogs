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
            <h2 className="text-4xl m-2">{blog.title}</h2>
            <h3 className="text-3x2 m-1.5">Author: {blog.author}</h3>
            <h3 className="m-1.5">URL: {blog.url}</h3>
            <h4 className="m-1.5">Likes: {blog.likes}</h4>
            <form action={giveLike}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit" className="bg-gray-600 p-3.5 m-1.5 rounded-2xl">give like</button>
            </form>
        </div>
    )
}