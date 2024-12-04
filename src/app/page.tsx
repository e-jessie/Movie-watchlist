import Button from "@/components/button";
import Navbar from '@/components/navbar';

export default function HomePage() {
  return (
    <div className="h-screen bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center flex flex-col items-center">
      <Navbar />
      <div className="m-auto backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8 md:p-12 lg:p-16 max-w-[90%] sm:max-w-[80%] md:max-w-[514px] text-center flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white">Welcome to FILMLY</h1>
        <p className="text-lg text-white mb-2 px-4 py-2 leading-relaxed">
          Explore popular movies, manage your watchlist, and get personalized recommendations!
        </p>
        <Button href="/auth/login" text="Let's Begin"/>
      </div>
    </div>
  );
}
