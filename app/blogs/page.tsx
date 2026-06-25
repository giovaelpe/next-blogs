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
                <input type="text" placeholder="search" name="title" />
                <button type="submit">search</button>
            </form>
            <ul>
                {
                    blogs.map((blog, index:number) => {
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