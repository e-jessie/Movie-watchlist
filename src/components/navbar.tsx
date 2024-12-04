// src/components/Navbar.tsx
import Link from "next/link";
import { Filmly } from './filmly';

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full mx-auto flex justify-between p-4 text-white backdrop-blur-md">
        <div className="flex justify-center items-center">
          <Filmly />
          <h1 className="text-2xl font-bold ">FILMLY</h1>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/">Home</Link>
          <Link href="/watchlist">Watchlist</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
