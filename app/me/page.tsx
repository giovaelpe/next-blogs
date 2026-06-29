import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session"
import { asc } from "drizzle-orm";
import { generateToken } from "../actions/users";
import { getReadlingList } from "../services/readingLists";


export default async function MePage(){
    const user = await getCurrentUser();
    if(!user){
        redirect("/login");
    }
    const readingList = await getReadlingList(user.id);
    const token = user.token? user.token : " No token yet for this user";
    return(
        <div className="flex-col justify-between">
            <h2>My profile</h2>
            <p>
                <strong>Name: </strong>
                {user.name}
            </p>
            <p>
                <strong>Username: </strong>
                {user.username}
            </p>
            <hr />
            <div>
                <h2>Reading List :</h2>
                <ul>
                    {
                        readingList.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.blog.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <hr />
            <h2>API Token</h2>
            <div>
                <p>Current token: {" "}
                    <code >{token}</code>
                </p>
            </div>
            <form action={generateToken}>
                <input type="hidden" name="username" value={user.username} />
                <button type="submit" className="bg-gray-700 font-bold hover:bg-gray-800 text-white py-2 px-4 rounded">generate new token</button>
            </form>
        </div>
    )
}