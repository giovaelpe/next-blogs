"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const NavBar = () => {
    const { data: session } = useSession();
    return (
        <nav>
            <Link href="/">Home</Link>
            {"  |  "}
            <Link href="/blogs">Blogs</Link>
            {"  |  "}
            <Link href="/users">Users</Link>
            {"  |  "}
            {session ? (
                <>
                    <Link href="/blogs/new">New</Link>
                    {"  |  "}
                    <em>{session.user?.name} logged in </em>{" "}
                    <button onClick={() => signOut()}>logout</button>
                </>
            ) : <Link href="/login">Login</Link>}
        </nav>
    )
}