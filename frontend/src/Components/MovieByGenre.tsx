import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieByGenre() {
    const [Data, setData] = useState<{ results: any[] }>({ results: [] });
    const [page, setPage] = useState(1);
    const { genreID } = useParams<{ genreID: string }>();
    const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

    interface MovieData {
        results: any;
        id: number;
        release_date: string;
        vote_average: number;
        overview: string;
        backdrop_path: string;
        original_title: string;
        title: string;
        genres: Array<{ id: number; name: string }>;
    }

    useEffect(() => {
        return(() => {
            const DataMovieByGenre = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreID}&page=${page}`);
                    const data = await response.json();
                    setData(data)
                    console.log(data)
                } catch (error) {
                    console.log('Une erreur est survenue',error)
                }
            }
            DataMovieByGenre() 
        })
    }, [genreID])



    function voteAverage(item: MovieData) {
        if (item.vote_average === 0) {
            return <h1>Click on the movie to see the Average Vote</h1>;
        } else {
            return <h1>{Math.floor(item.vote_average)}/10</h1>;
        }
    }

    function GoodName({ index, data }: { index: number; data: MovieData }) {
        const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/;
        const originalTitle = data.results[index]?.original_title;
        const title = data.results[index]?.title;
      
        if (!latinRegex.test(originalTitle)) {
          return (
            <>
              <h1>{originalTitle}</h1>
              <h1>({title})</h1>
            </>
          );
        } else {
          return <h1>{originalTitle}</h1>;
        }
      }


    return (
        <div className="grid grid-cols-4 gap-4 p-8">
            {Data.results.map((item: MovieData, index: number) => (
                <Link key={index} to={`/movieDetails/${item.id}`}>
                    <div>
                        <img  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Poster Image" />
                        <h1>{<GoodName index={index} data={Data}/>}</h1>
                    </div>

                    <div>
                        {voteAverage(item)} 
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MovieByGenre;
