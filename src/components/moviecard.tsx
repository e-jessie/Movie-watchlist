import Image from "next/image";
//import Button from "./button";



export interface MovieCardProps {
    title: string;
    posterPath: string;
    overview: string;
  }
  
  export default function MovieCard({ title, posterPath, overview }: MovieCardProps) {
    return (
      <div className="max-w-sm bg-white rounded-xl shadow-md p-4 m-4 border hover:scale-105 transition-transform duration-300 flex flex-col gap-2">
        {posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt={title}
            className="rounded-xl mb-4"
            width={150}
            height={100}
          />
        ) : (
          <div className="h-[300px] w-[200px] bg-gray-300 rounded mb-4 flex items-center justify-center">
            <p className="text-gray-500">No Image</p>
          </div>
        )}        
        <h2 className="text-heading-8 font-bold">{title}</h2>
        <p className="text-gray-700 text-sm">{overview}</p>
        {/* <Button href="/auth/login" text="Let's Begin" className="text-center mb-0"/> */}
      </div>
    );
  }
  