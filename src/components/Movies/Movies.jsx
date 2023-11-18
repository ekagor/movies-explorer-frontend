import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useMoviesContext } from '../../contexts/MoviesContext';
import { useState } from "react";
import './Movies.css';

const Movies = ({ movies, addMovie, onDeleteFilm, checkSavedMovies, getMovies }) => {
  const { initialSearchValue, setInitialSearchValue, shortMovie, setShortMovie, searched, setSearchedMovies } = useMoviesContext();
  const [firstEntrance, setFirstEntrance] = useState(true);

  const handleSearchMovies = (search) => {    
    if (!searched) {
      getMovies();
      setSearchedMovies(true);
    }
    setFirstEntrance(false)
    setInitialSearchValue(search);
    localStorage.setItem('initialSearchValue', search);
  };

  const handleShortChange = (checked) => {setShortMovie(checked)};

  return (
    <main className="movies">
      <SearchForm
        onShortChange={handleShortChange}
        shortMovie={shortMovie}
        initialSearchValue={initialSearchValue}
        searchMovies={handleSearchMovies}        
      />
      <MoviesCardList
        movies={movies}
        initialSearchValue={initialSearchValue}
        shortMovie={shortMovie}
        firstEntrance={firstEntrance}
        checkSavedMovies={checkSavedMovies}
        onDeleteFilm={onDeleteFilm}
        addMovie={addMovie}
        searched={searched}      
      />
    </main>
  );
};

export default Movies;