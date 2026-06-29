"use client"
import Welcome from './markdown/Welcome.mdx';
import "./globals.css";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Home</h1>
        <div className='markdown'>
          <Welcome />
        </div>
      </main>
    </div>
  );
}
