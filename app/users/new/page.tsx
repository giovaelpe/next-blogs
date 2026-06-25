"use client"

import Link from "next/link";
import { registerUser } from "@/app/actions/users";
import { useActionState } from "react";

const errorStyle = {
    color: "red"
}

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, {errors:{}, values:{name:"", username:""}})
    return (
        <div>
            <form action={formAction}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" defaultValue={state.values.name} />
                    {
                        state.errors.name && <p style={errorStyle}>{state.errors.name}</p>
                    }
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" defaultValue={state.values.username} />
                    {
                        state.errors.username && <p style={errorStyle}>{state.errors.username}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                    {
                        state.errors.password && <p style={errorStyle}>{state.errors.password}</p>
                    }
                </div>
                <button type="submit">register user</button>
            </form>
        </div>
    )
}