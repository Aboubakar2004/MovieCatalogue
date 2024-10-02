import { useEffect, useState } from "react"
import Carousel from 'react-grid-carousel'
import { Link } from "react-router-dom"

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



function FantasyMovieConnexion() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [Data , SetData] = useState<any>(null)
    const [Loading , SetLoading] = useState<boolean>(true)
    const apiKey = "dde133e5dad4ecdfe125539fc3db123d"

    useEffect(() => {
        return(() => {
            const fetchActionMovieData = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=14`)
                    const data = await response.json()
                    SetData(data)
                    console.log(data)
                    SetLoading(false)
                } catch (error) {
                    console.log("Une erreur est intervenue lors de la récupérations des données concernant les films d'actions", error)
                }
            }
            fetchActionMovieData()
        })
    }, [])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GoodName({ index, data }: { index: number; data: any }) {
  const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/
  const originalTitle = data.results[index]?.original_title
  const title = data.results[index]?.title
    
  if (!latinRegex.test(originalTitle)) {
    return (
      <>
        <h1>{title}</h1>
        <h1>({originalTitle})</h1>
      </>
    )
  } else {
    return <h1>{originalTitle}</h1>
  }
    }
    

  return (
    <div>
  {Loading ? (
    <h1>Chargement ...</h1>
  ) : (
    <div>
        <div className="w-full">
          <Carousel cols={4} row={1} gap={20} loop>
            {Data.results.map((item: MovieData, index: number) => (
              <Carousel.Item key={index} className="flex items-center justify-center">
                <Link to={`/movieDetails/${item.id}`} >
                  <div key={index}>
                      <div >
                        <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="MoviePoster" />
                        <h1><GoodName index={index} data={Data}/></h1>
                      </div>
                    </div>
                </Link>
              </Carousel.Item>
                ))}
          </Carousel>
        </div>
    </div>
  )}
    </div>
  )
}

export default FantasyMovieConnexion