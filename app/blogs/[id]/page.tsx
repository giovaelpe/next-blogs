import { giveLike } from "@/app/actions/blogs";
import { addBlogToReadingList } from "@/app/actions/readingLists";
import { getOneBlog } from "@/app/services/blogs";
import { checkReadingList } from "@/app/services/readingLists";
import { notFound } from "next/navigation";


export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getOneBlog(Number(id));
    if (!blog) {
        notFound();
    }
    const checkList = await checkReadingList(blog.id);

    return (
        <div data-testid="blog-detail">
            <h2 className="text-4xl m-2" data-testid="blog-title">{blog.title}</h2>
            <h3 className="text-3x2 m-1.5" data-testid="blog-author">Author: {blog.author}</h3>
            <h3 className="m-1.5">URL: {blog.url}</h3>
            <h4 className="m-1.5">Likes: {blog.likes}</h4>
            <form action={giveLike}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit" className="bg-gray-600 p-3.5 m-1.5 rounded-2xl" >give like</button>
            </form>
            {!checkList && (
                <form action={addBlogToReadingList}>
                    <input type="hidden" name="blog" value={blog.id} />
                    <button type="submit" className="bg-green-600 p-3.5 m-1.5 rounded-2xl" data-testid="add-to-reading-list-button">add to reading list</button>
                </form>
            )}
        </div>
    )
}