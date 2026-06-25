import { getOneUser } from "@/app/services/users";
import { notFound } from "next/navigation";
import  Link  from "next/link";

export default async function UserPage({params}: {params:Promise<{ username:string }>}){
    const {username} = await params;
    const user = await getOneUser(username);
    console.log(user?.username);
    if(!user){
        console.log("se llamó esta")
        notFound();
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Username : {user.username}</p>
            <h3>Blogs : </h3>
            <ul>
            {
                user.blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}