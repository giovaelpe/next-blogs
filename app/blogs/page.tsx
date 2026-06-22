import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function Blogs() {
    const blogs = getBlogs()
    return (
        <div>
            <h1>List of blogs</h1>
            <ul>
            {
                blogs.map((blog, index) => {
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