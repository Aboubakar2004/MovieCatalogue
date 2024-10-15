import { useEffect, useState } from "react";
import HorrorMovieConnexion from "./HorrorMovieConnexion";
import { LuDot } from "react-icons/lu";
import AnimationMovieConnexion from "./AnimationMovieConnexion";
import ComedyMovieConnexion from "./ComedyMovieConnexion";
import FantasyMovieConnexion from "./FantasyMovieConnexion";
import TrendingMovie from "./TrendingMovie";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";

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

function GoodName({ index, data }: { index: number; data: any }) {
  const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]|\\:;'",.<>/?`~\-]*$/;
  const originalTitle = data.results[index]?.original_title;
  const title = data.results[index]?.title;

  if (!latinRegex.test(originalTitle)) {
    return (
      <>
        <h1>{originalTitle}</h1>
        <h1>{title}</h1>
      </>
    );
  } else {
    return <h1>{originalTitle}</h1>;
  }
}

function ApiConnexion() {
  const [Data, SetData] = useState<any>(null);
  const [Loading, SetLoading] = useState(true);
  const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en&api_key=${apiKey}`);
        const data = await response.json();
        SetData(data);
        SetLoading(false);
      } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des données", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchBar/>
      {Loading ? (
        <h1>Chargement ...</h1>
      ) : (
        <div>
          {Data?.results?.length > 0 && (
            <div className="relative">
              <img className="object-fill" src={`https://image.tmdb.org/t/p/original/${Data.results[0].backdrop_path}`} alt="Movie Poster" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start gap-4 p-32 text-white">
                <p className="text-2xl font-bold"><GoodName index={0} data={Data} /></p>
                <div className="flex gap-8">
                  <p>{Math.floor(Data.results[0].vote_average)}/10</p> 
                  <LuDot className="text-2xl" />
                  <p>{Data.results[0].release_date.split('-')[0]}</p>
                </div>
                <p>{Data.results[0].overview}</p>
                <div>
                  {Data.results[0].genre_ids.map((genreID: number) => (
                    <Link to={`/moviebygenre/${genreID}`}>
                        <button key={genreID} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-full text-sm px-5 py-2.5 me-2 mb-2">{genreMap[genreID]}</button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="p-8">
            <h1 className="font-bold text-2xl">Trending Movie</h1>
            <TrendingMovie />
            <h1 className="font-bold text-2xl">Horror Movie</h1>
            <HorrorMovieConnexion />
            <h1 className="font-bold text-2xl">Animation Movie</h1>
            <h1></h1>
            <AnimationMovieConnexion />
            <h1 className="font-bold text-2xl">Comedy Movie</h1>
            <ComedyMovieConnexion />
            <h1 className="font-bold text-2xl">Fantasy Movie</h1>
            <FantasyMovieConnexion />
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiConnexion;
