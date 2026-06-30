"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import React, { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false
        })
        if (result?.error) {
            setError("Invalid username or password")
        } else {
            router.push("/?login=success");
            router.refresh();
        }
    }

    return (

        <div>
            <h2 className="text-3xl m-1.5">Login</h2>
            {error && <p data-testid="error-message" style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username
                        <input type="text" name="username" required className="bg-amber-50 m-3.5 text-black" />
                    </label>
                </div>
                <div>
                    <label>
                        Password
                        <input type="password" name="password" required className="bg-amber-50 m-3.5 text-black" />
                    </label>
                </div>
                <button data-testid="login-button" type="submit" className="bg-gray-600 p-3.5 m-1.5 rounded-2xl">Login</button>
            </form>
        </div>
    )
}