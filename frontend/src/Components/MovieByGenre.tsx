import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface MovieData {
    poster_path: string;
    id: number;
    release_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    original_title: string;
    title: string;
    genres: Array<{ id: number; name: string }>;
}

interface DataResponse {
    results: MovieData[];
}

function MovieByGenre() {
    const [data, setData] = useState<DataResponse | null>(null);
    const { genreID } = useParams<{ genreID: string }>();
    const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreID}`);
                const result = await response.json();
                
                if (result && result.results) {
                    setData(result);
                } else {
                    console.error('Aucun film trouvé pour ce genre');
                }
            } catch (error) {
                console.log('Une erreur est survenue', error);
            }
        };
        fetchData();
    }, [genreID]);

    function voteAverage(item: MovieData) {
        return item.vote_average > 0
            ? <h1>{Math.floor(item.vote_average)}/10</h1>
            : <h1>Aucune note disponible</h1>;
    }

    function GoodName({ data }: { index: number; data: MovieData }) {
        const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/;
        const originalTitle = data.original_title;
        const title = data.title;

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
            {data?.results.map((item, index) => (
                <Link key={item.id} to={`/movieDetails/${item.id}`}>
                    <div>
                        {item.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="Poster Image" />
                        ) : (
                            <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
                                <span>Image indisponible</span>
                            </div>
                        )}
                        <GoodName index={index} data={item} />
                    </div>
                    <div>{voteAverage(item)}</div>
                </Link>
            ))}
        </div>
    );
}

export default MovieByGenre;
