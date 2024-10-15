import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ActionMovieConnexion from './Components/HorrorMovieConnexion';
import ApiConnexion from './Components/ApiConnexion';
import Header from './Components/Header';
import SearchBar from './Components/Searchbar';
import DetailsMoviePage from './Components/DetailsMoviePage';
import MovieByGenre from './Components/MovieByGenre';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route  path='/' element={<ApiConnexion />} />
        <Route path='/actionmovie' element={<ActionMovieConnexion />} />
        <Route  path='/header' element={<Header />}/>
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="/movieDetails/:movieId" element={<DetailsMoviePage />} />
        <Route  path='/moviebygenre/:genreID' element={<MovieByGenre />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
