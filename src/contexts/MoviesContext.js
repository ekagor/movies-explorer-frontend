import { createContext, useContext, useEffect, useState } from 'react';

const MoviesContext = createContext();

export const useMoviesContext = () => {return useContext(MoviesContext)};

export const MoviesProvider = ({ children }) => {
  const [initialSearchValue, setInitialSearchValue] = useState(onInitialSearchValue());
  const [searched, setSearchedMovies] = useState(getSearched());
  const [shortMovie, setShortMovie] = useState(getShortMovie());
  const [foundMovies, setFoundMovies] = useState(getFoundMovies());

  function onInitialSearchValue() { const setInitialSearchValue = localStorage.getItem('initialSearchValue') ?? '';
    return setInitialSearchValue;
  }

  function getSearched() { const onSearched = localStorage.getItem('searched') ?? false;
    return onSearched === 'true';
  }

  function getShortMovie() { const onShortMovie = localStorage.getItem('shortMovie') ?? false;
    return onShortMovie === 'true';
  }

  function getFoundMovies() { const onFoundMovies = localStorage.getItem('foundMovies') ?? '[]';
    return JSON.parse(onFoundMovies);
  }

  const cleanMoviesContext = () => {
    setInitialSearchValue('');
    setSearchedMovies(false);
    setShortMovie(false);
    setFoundMovies([]);
  };

  useEffect(() => {
    localStorage.setItem('initialSearchValue', initialSearchValue);
    localStorage.setItem('searched', searched);
    localStorage.setItem('shortMovie', shortMovie);
    if (foundMovies.length > 0) { localStorage.setItem('foundMovies', JSON.stringify(foundMovies))}
  }, [initialSearchValue, searched, shortMovie, foundMovies]);

  const contextValue = { initialSearchValue, setInitialSearchValue, searched, setSearchedMovies, shortMovie,
    setShortMovie, foundMovies, setFoundMovies, cleanMoviesContext, };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
