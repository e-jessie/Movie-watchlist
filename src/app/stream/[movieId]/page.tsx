import Link from "next/link";


export default function StreamPage({ params }: { params: { movieId: string } }) {
    const { movieId } = params;

    return (
        <div className="flex flex-col items-center p-4">
            <Link href="/homepage" className="text-blue-500 hover:underline w-[200px] my-5">
                Back to Homepage
            </Link>
            <iframe
                src={`https://multiembed.mov/?video_id=${movieId}&tmdb=1`}
                className="w-full h-[80vh]"
                allowFullScreen
            ></iframe>
        </div>
    );
}
