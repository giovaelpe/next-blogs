import Link from "next/link";
import { registerUser } from "@/app/actions/users";

export default function RegisterPage() {
    return (
        <div>
            <form action={registerUser}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                </div>
                <button type="submit">register user</button>
            </form>
        </div>
    )
}