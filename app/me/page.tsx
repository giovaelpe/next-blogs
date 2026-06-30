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
    const token = user.token ? <code data-testid="api-token">{user.token}</code> : <span data-testid="no-token-message">No token yet for this user</span>;
    return (
        <div data-testid="user-profile" className="flex-col justify-between">
            <h1 className="text-2xl">My profile</h1>
            <p data-testid="user-name">
                <strong >Name: </strong>
                {user.name}
            </p>
            <p data-testid="user-username">
                <strong>Username: </strong>
                {user.username}
            </p>
            <hr />
            <div data-testid="reading-list-section">
                <h1>Reading List </h1>
                {(readingListPending.length === 0 && readingListDone.length === 0) ? <span data-testid="empty-reading-list"> Your read list is empty</span> :
                    <div>
                        <div className="bg-amber-100 text-black p-1.5 mb-1.5">
                            <h2 className="text-2xl">Unread ({readingListPending.length})</h2>
                            {readingListPending.length === 0 && <span data-testid="no-unread-blogs">This list is empty</span>}
                            <ul>
                                {
                                    readingListPending.map((item, index) => {
                                        return (
                                            <li data-testid="unread-section" key={item.id} className="flex mb-1 items-center">
                                                {item.blog.title}
                                                <form action={markAsRead}>
                                                    <input type="hidden" name="id" value={item.id} />
                                                    <button type="submit" className="bg-green-600 py-0.5 px-1.5 m-1.5 rounded" data-testid="mark-read-">mark as read</button>
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
                }
            </div>
            <hr />
            <h2>API Token</h2>
            <div data-testid="api-token-section">
                <p data-testid="token-display">Current token: {" "}
                    {token}
                </p>
            </div>
            <form action={generateToken}>
                <input type="hidden" name="username" value={user.username} />
                <button data-testid="generate-token-button" type="submit" className="bg-gray-700 font-bold hover:bg-gray-800 text-white py-2 px-4 rounded">generate new token</button>
            </form>
        </div>
    )
}