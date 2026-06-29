import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session"
import { asc } from "drizzle-orm";
import { generateToken } from "../actions/users";
import { getReadlingList } from "../services/readingLists";
import { addBlogToReadingList, markAsRead } from "../actions/readingLists";


export default async function MePage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }
    const readingListPending = await getReadlingList(user.id);
    const readingListDone = await getReadlingList(user.id, true);
    const token = user.token ? user.token : " No token yet for this user";
    return (
        <div className="flex-col justify-between">
            <h1 className="text-2xl">My profile</h1>
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
                <h1>Reading List </h1>
                <div className="bg-amber-100 text-black p-1.5 mb-1.5">
                    <h2 className="text-2xl">Unread ({readingListPending.length})</h2>
                    <ul>
                        {
                            readingListPending.map(item => {
                                return (
                                    <li key={item.id} className="flex mb-1 items-center">
                                        {item.blog.title}
                                        <form action={markAsRead}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button type="submit" className="bg-green-600 py-0.5 px-1.5 m-1.5 rounded">mark as read</button>
                                        </form>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="bg-green-300 text-black p-1.5">
                    <h2 className="text-2xl">Read ({readingListDone.length})</h2>
                    <ul>
                        {
                            readingListDone.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.blog.title}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
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