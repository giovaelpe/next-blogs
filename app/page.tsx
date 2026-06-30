"use client"
import Welcome from './markdown/Welcome.mdx';
import "./globals.css";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [notification, setNotification] = useState("Login successful!");
  const searchParams = useSearchParams();
  
  return (
    <div>
      {
        searchParams.get('login') === 'success' && <div data-testid="notification" className="border-b-emerald-800 border-solid bg-emerald-400 font-black p-2">{notification}</div>
      }
      <main>
        <h1>Home</h1>
        <div className='markdown'>
          <Welcome />
        </div>
      </main>
    </div>
  );
}
