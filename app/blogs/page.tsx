import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlog } from "../actions/blogs";

export default async function Blogs({searchParams} : {searchParams: Promise<{title?:string}>}) {
    const allBlogs = getBlogs()
    const {title} = await searchParams;
    const blogs = title? allBlogs.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase())) : allBlogs;
    return (
        <div>
            <h1>List of blogs</h1>
            <form action={searchBlog}>
                <input type="text" placeholder="search" name="title" />
                <button type="submit">search</button>
            </form>
            <ul>
                {
                    blogs.sort((a, b) => b.likes - a.likes).map((blog, index) => {
                        return (
                            <li key={index}>
                                <Link href={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}