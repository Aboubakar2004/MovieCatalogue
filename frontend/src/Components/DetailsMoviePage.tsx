import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import { LuDot } from "react-icons/lu";

interface MovieData {
    release_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    original_title: string;
    title: string;
    genres: Array<{ id: number; name: string }>;
}

function DetailsMoviePage() {
    const [Data, SetData] = useState<MovieData | null>(null);    
    const apiKey = "dde133e5dad4ecdfe125539fc3db123d";
    const { movieId } = useParams<{ movieId: string }>();

    const genreMap: Record<number, string> = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
      };


    useEffect(() => {
        return (() => {
            const DetailsMovieData = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
                    const data = await response.json()
                    SetData(data)
                    console.log(data)
                } catch (error) {
                    console.log("Une erreur a été détécté lors de la récupérations des données", error)
                }
            }
            DetailsMovieData()
        })
    }, [movieId])

    function GoodName({ data }: { data: MovieData | null; index: number }) {
        if (!data) return null; 
    
        const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/;
        const originalTitle = data.original_title;
        const title = data.title;
    
        if (!latinRegex.test(originalTitle)) {
            return (
                <div>
                    <h1>{originalTitle}</h1>
                    <h1>({title})</h1>
                </div>
            );
        } else {
            return <h1>{originalTitle}</h1>;
        }
    }
    


  return (
    <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start gap-4 p-32 text-white">
                <h1 className="text-2xl font-bold"><GoodName data={Data} index={0} /></h1>
                <div className="flex gap-8">
                    <h1>{Data?.release_date.split('-')[0]}</h1> 
                    <LuDot className="text-2xl" />
                    <h1>{Math.floor(Data?.vote_average ?? 0)}/10</h1>
                </div>

                        <h1>{Data?.overview}</h1>
                <div className="flex gap-4">
                    {Data?.genres.map((genre , genreId : number ) => (
                        <Link to={`/moviebygenre/${genre.id}`}>
                            <button key={genreId} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-full text-sm px-5 py-2.5 me-2 mb-2">{genreMap[genre.id]}</button>
                        </Link>
                    ))}
                </div>

        </div>
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${Data?.backdrop_path}`} alt="" />
        </div>
    </div>
  )
}

export default DetailsMoviePage