import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useMoviesContext } from "../../contexts/MoviesContext";
import { useState, useEffect } from "react";
import useResize from "../../hooks/useResize";
import "./Movies.css";
import { PLUS_INIT_CARDS, INIT_CARDS, VIEW_SIZE } from "../../utils/constants";

const Movies = ({
  movies,
  addMovie,
  onDeleteFilm,
  checkSavedMovies,
  getMovies,
}) => {

  const getCardsShow = () => {
    return getScreen >= VIEW_SIZE.L
      ? INIT_CARDS.L
      : getScreen >= VIEW_SIZE.M
      ? INIT_CARDS.M
      : getScreen >= VIEW_SIZE.S
      ? INIT_CARDS.S
      : INIT_CARDS.D;
  };
  const getScreen = useResize();
  const [isLoading, setIsLoading] = useState(false);
  const [cardsShow, setCardsShow] = useState(getCardsShow());

  function abc (a) {setCardsShow(getCardsShow())}
  useEffect(() => {
    abc();
  }, [movies]);
  
  const {
    initialSearchValue,
    setInitialSearchValue,
    shortMovie,
    setShortMovie,
    searched,
    setSearchedMovies,
  } = useMoviesContext();
  const [firstEntrance, setFirstEntrance] = useState(true);

  const handleSearchMovies = (search) => {
    abc();
    if (!searched) {
      setIsLoading(true);
      getMovies(() => {setIsLoading(false)});
      setSearchedMovies(true);
    }
    setFirstEntrance(false);
    setInitialSearchValue(search);
    localStorage.setItem("initialSearchValue", search);
  }
 
  const handleShortChange = (checked) => {
    setShortMovie(checked);
  };

  const cardsLoading = () => {
    setCardsShow(
      getScreen >= VIEW_SIZE.L
        ? cardsShow + PLUS_INIT_CARDS.L
        : getScreen >= VIEW_SIZE.M
        ? cardsShow + PLUS_INIT_CARDS.M
        : getScreen >= VIEW_SIZE.S
        ? cardsShow + PLUS_INIT_CARDS.S
        : cardsShow + PLUS_INIT_CARDS.D
    );
  };

  const dfg = (e)=>{handleSearchMovies(localStorage.getItem('initialSearchValue'))}
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", dfg);
    }, 500);
    return () => {
      window.removeEventListener("resize", dfg);
    };
  });

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
        isLoading={isLoading}
        cardsLoading={cardsLoading}
        cardsShow={cardsShow}
      />
    </main>
  );
};

export default Movies;
