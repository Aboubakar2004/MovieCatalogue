import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface MovieData {
  id: number;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  original_title: string;
  title: string;
  genres: Array<{ id: number; name: string }>;
}

function AnimationMovieConnexion() {
  const [Data, SetData] = useState<{ results: MovieData[] }>({ results: [] });
  const [Loading, SetLoading] = useState<boolean>(true);
  const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

  useEffect(() => {
    const fetchActionMovieData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`);
        const data = await response.json();
        SetData(data);
        SetLoading(false);
      } catch (error) {
        console.log("Une erreur est intervenue lors de la récupération des données concernant les films d'actions", error);
      }
    };
    fetchActionMovieData();
  }, []);

  function GoodName({ index, data }: { index: number; data: MovieData[] }) {
    const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/;
    const originalTitle = data[index]?.original_title;
    const title = data[index]?.title;

    if (!latinRegex.test(originalTitle)) {
      return (
        <>
          <h1>{title}</h1>
          <h1>({originalTitle})</h1>
        </>
      );
    } else {
      return <h1>{originalTitle}</h1>;
    }
  }

  return (
        <div className="w-full">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={4}
      >
        {Data.results.map((item: MovieData, index: number) => (
          <SwiperSlide key={index}>
            <Link to={`/movieDetails/${item.id}`}>
              <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="Movie Poster" />
                <h1><GoodName index={index} data={Data.results} /></h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
}

export default AnimationMovieConnexion;
