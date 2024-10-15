import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from "react-router-dom";

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

function HorrorMovieConnexion() {
  const [Data, SetData] = useState<any>(null);
  const [Loading, SetLoading] = useState<boolean>(true);
  const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

  useEffect(() => {
    const fetchHorrorMovieData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`);
        const data = await response.json();
        SetData(data);
        SetLoading(false);
      } catch (error) {
        console.log("Une erreur est intervenue lors de la récupération des données concernant les films d'horreur", error);
        SetLoading(false);
      }
    };
    fetchHorrorMovieData();
  }, []);

  function GoodName({ index, data }: { index: number; data: any }) {
    const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]|\\:;'",.<>/?`~\-]*$/;
    const originalTitle = data[index]?.original_title; // Modifié ici
    const title = data[index]?.title; // Modifié ici

    return !latinRegex.test(originalTitle) ? (
      <>
        <h1>{title}</h1>
        <h1>({originalTitle})</h1>
      </>
    ) : (
      <h1>{originalTitle}</h1>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={4}
      >
        {!Loading && Data?.results?.map((item: MovieData, index: number) => (
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

export default HorrorMovieConnexion;
