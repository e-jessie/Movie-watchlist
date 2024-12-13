import Image from "next/image";


export interface MovieCardProps {
  title: string;
  posterPath: string;
  overview: string;
}

export default function MovieCard({ title, posterPath, overview }: MovieCardProps) {
  return (
    <div className="h-[500px] max-w-sm bg-white rounded-xl shadow-md p-4 m-4 border hover:scale-105 transition-transform duration-300 flex flex-col gap-2">
      {posterPath ? (
        <Image
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          alt={title}
          className="rounded-xl mb-4"
          width={150}
          height={100}
        />
      ) : (
        <div className="h-[270px] w-[150px] bg-gray-500 rounded-xl mb-4 flex items-center justify-center">
          <Image
            src="/images/filmlyIcon.png" 
            alt={title}
            width={150}
            height={150}
          />
        </div>
      )}
      <h2 className="text-heading-8 font-bold">{title}</h2>
      {overview ? (
        <p className="text-sm text-gray-700 overflow-y-auto">{overview}</p>
      ) : (
        <p className="text-sm text-red-400 overflow-y-auto"> No Description</p>
      )}
    </div>
  );
}
