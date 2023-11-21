import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {useState} from 'react';
import {useMoviesContext} from '../../contexts/MoviesContext';
import './SavedMovies.css';


const SavedMovies = ({movies, onDeleteFilm, checkSavedMovies}) => {
  const {searched, setSearchedMovies} = useMoviesContext();
  const [initialSearchValueSave, setInitialSearchValueSave] = useState('');
  const [movieSaveShort, setMovieSaveShort] = useState(false);

  const handleSearchMovies = (search) => {
    setInitialSearchValueSave(search);
    setSearchedMovies(true);
  };

  const handleShortChange = (checked) => {
    setMovieSaveShort(checked);
    localStorage.setItem('movieSaveShort', checked);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        searchMovies={handleSearchMovies}
        onShortChange={handleShortChange}
        shortMovie={movieSaveShort}
      />
      <MoviesCardList
        searched={searched}
        movies={movies}
        initialSearchValue={initialSearchValueSave}
        shortMovie={movieSaveShort}
        checkSavedMovies={checkSavedMovies}
        onDeleteFilm={onDeleteFilm}
      />
    </main>
  );
};

export default SavedMovies;
