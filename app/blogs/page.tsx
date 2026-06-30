import Link from "next/link";
import { getBlogs, searchBlogByTitle } from "../services/blogs";
import { searchBlog } from "../actions/blogs";



export default async function Blogs({searchParams} : {searchParams: Promise<{title?:string}>}) {
    const allBlogs = await getBlogs()
    const {title} = await searchParams;
    const blogs = title? await searchBlogByTitle(title) : allBlogs;
    return (
        <div>
            <h1>List of blogs</h1>
            <form action={searchBlog}>
                <input type="text" placeholder="search" name="title" className="bg-amber-50 m-3.5 text-black" data-testid="filter-input" />
                <button type="submit" className="bg-gray-600 p-1.5 m-1 rounded-2xl" data-testid="search-button">search</button>
            </form>
            <ul data-testid="blogs-list">
                {
                    blogs.map((blog, index:number) => {
                        return (
                            <li key={index} className="m-1">
                                <Link href={`/blogs/${blog.id}`} className="hover:underline">
                                    {blog.title}
                                </Link>
                                <span> {blog.likes} likes</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}