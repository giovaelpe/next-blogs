"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
    const {message, type} = useNotification();
    if(!message) return null;


    return <div data-testid="notification" className="border-b-emerald-800 border-solid bg-emerald-400 font-black p-2">{message}</div>
}