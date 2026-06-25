import { createBlog } from "@/app/actions/blogs";

export default function NewBlog() {
    return (
        <div>
            <h2>Add new blog</h2>
            <form action={createBlog}>
                <input type="text" name="author" placeholder="Author" />
                <input type="url" name="url" placeholder="URL" />
                <input type="text" name="title" placeholder="Title" />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
}