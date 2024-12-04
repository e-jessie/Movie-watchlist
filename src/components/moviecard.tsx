// src/components/MovieCard.tsx
import Image from "next/image";


export interface MovieCardProps {
    title: string;
    posterPath: string;
    overview: string;
  }
  
  export default function MovieCard({ title, posterPath, overview }: MovieCardProps) {
    return (
      <div className="max-w-sm bg-white rounded shadow-md p-4">
        <Image
          src={`https://image.tmdb.org/t/p/w200${posterPath}`}
          alt={title}
          className="rounded mb-4"
        />
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-700 text-sm">{overview}</p>
      </div>
    );
  }
  