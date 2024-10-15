import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { List, ListItem, Card } from "@material-tailwind/react";

interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  title: string;
  poster_path: string; // Assurez-vous que cette propriété est incluse
}

interface SearchData {
  results: Movie[];
}

function SearchBar() {
  const [name, setName] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData>({ results: [] });
  const apiKey = "dde133e5dad4ecdfe125539fc3db123d";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (name.trim()) {
      const searchMovies = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`);
          const data = await response.json();
          setSearchData(data);
          console.log(data);
        } catch (error) {
          console.error("Une erreur est survenue lors de la récupération des données", error);
        }
      };
      searchMovies();
    } else {
      setSearchData({ results: [] });
    }
  }, [name]);

  const GoodName = ({ index, data }: { index: number; data: SearchData }) => {
    const latinRegex = /^[A-Za-z0-9\s!@#$%^&*()_+={}[\]|\\:;'",.<>/?`~-]*$/;
    const originalTitle = data.results[index]?.original_title;
    const title = data.results[index]?.title;

    return (
      <div className="flex text-black">
        {latinRegex.test(originalTitle) ? (
          <h1>{title}</h1>
        ) : (
          <div className="flex">
            <h1>{title}</h1>
            <h1 className="text-gray-500"> ({originalTitle})</h1>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="relative w-full max-w-lg mx-auto mt-8 mb-7 bg-transparent">
      <div className="flex items-center gap-4 bg-white rounded-full p-3 shadow-lg">
        <IoIosSearch className="text-lg text-black" />
        <input
          type="text"
          name="SearchBar"
          placeholder="Search a movie"
          className="bg-transparent text-black placeholder-gray-500 focus:outline-none w-full"
          onChange={handleChange}
          value={name}
        />
      </div>
      {name && searchData.results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
          <Card className="bg-white p-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <List className="divide-y divide-gray-300"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {searchData.results.map((movie, movieIndex) => (
                <Link to={`/movieDetails/${movie.id}`} className="flex items-center" key={movie.id}>
                  <ListItem className="p-2 hover:bg-gray-100 gap-8" placeholder={""} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <img
                      className="w-16 h-24 object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                    />
                    <div className="flex flex-col">
                      <GoodName index={movieIndex} data={searchData} />
                    </div>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
