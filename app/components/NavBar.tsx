"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const NavBar = () => {
    const { data: session } = useSession();
    return (
        <nav className="flex p-2.5 bg-gray-700">
            <Link href="/" className="hover:underline hover:bg-gray-900 m-1.5">Home</Link>
            {"  |  "}
            <Link href="/blogs" className="hover:underline hover:bg-gray-900 m-1.5">Blogs</Link>
            {"  |  "}
            <Link href="/users" className="hover:underline hover:bg-gray-900 m-1.5">Users</Link>
            {"  |  "}
            {session ? (
                <>
                    <Link href="/blogs/new" className="hover:underline hover:bg-gray-900 m-1.5">New</Link>
                    {"  |  "}
                    <em className="m-1.5">{session.user?.name} logged in </em>{" "}
                    <button onClick={() => signOut()}>logout</button>
                </>
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