import Navbar from "@/components/navbar";

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center">
        <Navbar />
        <main className="flex-grow pt-[70px]">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2024 FILMLY. All rights reserved.</p>
        </footer>
      </div>
    );
  }
  