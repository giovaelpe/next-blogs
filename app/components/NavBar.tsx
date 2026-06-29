"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const NavBar = () => {
    const { data: session } = useSession();
    return (
        <nav className="flex justify-between mb-1.5 p-2.5 bg-gray-700">
            <div>
                <Link href="/" className="hover:underline hover:bg-gray-900 m-1.5">Home</Link>
                {"  |  "}
                <Link href="/blogs" className="hover:underline hover:bg-gray-900 m-1.5">Blogs</Link>
                {"  |  "}
                <Link href="/users" className="hover:underline hover:bg-gray-900 m-1.5">Users</Link>
                {"  |  "}
                {session && <Link href="/blogs/new" className="hover:underline hover:bg-gray-900 m-1.5">New</Link>}
            </div>
            
                {session ? (
                    <div>
                        <Link href="/me" className="hover:underline hover:bg-gray-900 m-1.5">Me</Link>
                        <em className="m-1.5">{session.user?.name} logged in </em>{" "}
                        <button onClick={() => signOut()} className="hover:underline hover:bg-gray-900 m-1.5">logout</button>
                    </div>
                ) : (
                    <div>
                        <Link href="/login" className="hover:underline hover:bg-gray-900 m-1.5">Login</Link>
                        {"  |  "}
                        <Link href="/users/new" className="hover:underline hover:bg-gray-900 m-1.5">Register users</Link>
                    </div>
                )}
            
        </nav>
    )
}