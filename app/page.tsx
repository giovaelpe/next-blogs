"use client"

import Welcome from './markdown/Welcome.mdx';
import "./globals.css";
import { Suspense } from 'react';
import LoginNotification from './components/LoginNotification';


export default function Home() {
  
  return (
    <div>
      <Suspense>
        <LoginNotification />
      </Suspense>
      <main>
        <h1>Home</h1>
        <div className='markdown'>
          <Welcome />
        </div>
      </main>
    </div>
  );
}
