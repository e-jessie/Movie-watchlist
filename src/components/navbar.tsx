// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Movie Watchlist</h1>
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/watchlist">Watchlist</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
