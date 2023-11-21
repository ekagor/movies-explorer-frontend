import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({
  movies,
  addMovie,
  onDeleteFilm,
  checkSavedMovies,
  initialSearchValue,
  shortMovie,
  searched,
  firstEntrance,
  isLoading,
  cardsLoading,
  cardsShow
}) => {
  const { pathname } = useLocation();
  
  const filmFiltered = searched
    ? movies
        .filter((movie) => {
          const movieNameRU = (movie.nameRU ? movie.nameRU : "").toLowerCase();
          const movieNameEN = (movie.nameEN ? movie.nameEN : "").toLowerCase();
          const search = initialSearchValue || "";
          const transformInitialSearchValue =
            movieNameRU.includes(search.toLowerCase()) ||
            movieNameEN.includes(search.toLowerCase());
          return (
            transformInitialSearchValue && (!shortMovie || movie.duration <= 40)
          );
        })
        .slice(0, cardsShow)
    : [];

  const isShowing = cardsShow === filmFiltered.length;
  //console.log(firstEntrance);

  return (
    <section className="movies-lists">
      {isLoading && <Preloader />}
      {pathname === "/movies" && filmFiltered.length === 0 && !firstEntrance ? (
        <p className="movies__serch-error">Ничего не найдено</p>
      ) : (!isLoading &&
        <ul className="movies-lists__list">
          {filmFiltered.map((movie) => (
            <MoviesCard
              checkSavedMovies={checkSavedMovies}
              addMovie={addMovie}
              movie={movie}
              onDeleteFilm={onDeleteFilm}
              key={movie._id || movie.movieId}
            />
          ))}
        </ul>
      )}

      {isShowing && (
        <button
          type="button"
          className="movies-lists__button-plus"
          onClick={cardsLoading}
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
