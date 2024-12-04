
export default function HomePage() {
  return (
    <div className="mx-auto p-8 bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Welcome to Movie Watchlist</h1>
      <p className="text-center text-lg text-white">
        Explore popular movies, manage your watchlist, and get personalized recommendations!
      </p>
      <div className="flex justify-center mt-6">
        <a
          href="/watchlist"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go to Watchlist
        </a>
      </div>
    </div>
  );
}
