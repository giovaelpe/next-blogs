"use client"


import { registerUser } from "@/app/actions/users";
import { useActionState, useEffect, useState } from "react";
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
                    <input id="name" name="name" type="text" defaultValue={state.values.name} className="bg-amber-50 m-3.5 text-black" />
                    {
                        state.errors.name && <p style={errorStyle}>{state.errors.name}</p>
                    }
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" defaultValue={state.values.username} className="bg-amber-50 m-3.5 text-black" />
                    {
                        state.errors.username && <p data-testid="username-error" style={errorStyle}>{state.errors.username}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className="bg-amber-50 m-3.5 text-black"/>
                    {
                        state.errors.password && <p data-testid="passwordConfirm-error" style={errorStyle}>{state.errors.password}</p>
                    }
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input type="password" name="password-confirm" id="password-confirm" className="bg-amber-50 m-3.5 text-black"/>
                </div>
                <button data-testid="register-button" type="submit" className="bg-gray-600 p-3.5 m-1.5 rounded-2xl">register user</button>
                {
                    state.errors.passwordConfirm && <p data-testid="passwordConfirm-error" style={errorStyle}>{state.errors.passwordConfirm}</p>
                }
            </form>
        </div>
    )
}