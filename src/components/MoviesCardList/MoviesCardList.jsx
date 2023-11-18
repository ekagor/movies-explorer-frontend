import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import useResize from '../../hooks/useResize';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {PLUS_INIT_CARDS, INIT_CARDS, VIEW_SIZE,} from '../../utils/constants';

const MoviesCardList = ({movies, addMovie, onDeleteFilm, checkSavedMovies, initialSearchValue, shortMovie, searched, firstEntrance}) => {
  const { pathname } = useLocation()
  const getScreen = useResize();
  let listView;

  switch(true) {
    case (getScreen >= VIEW_SIZE.L):
      listView = INIT_CARDS.L;
      break;
    case (getScreen >= VIEW_SIZE.M):
      listView = INIT_CARDS.M;
      break;
    default:
      listView = INIT_CARDS.S;
      break;
  }

  const [cardsShow, setCardsShow] = useState(listView);

  const filmFiltered = searched
    ? movies
        .filter((movie) => {
          const movieNameRU = (movie.nameRU ? movie.nameRU : '').toLowerCase();
          const movieNameEN = (movie.nameEN ? movie.nameEN : '').toLowerCase();
          const search = initialSearchValue || '';
          const transformInitialSearchValue = movieNameRU.includes(search.toLowerCase()) || movieNameEN.includes(search.toLowerCase());
          return transformInitialSearchValue && (!shortMovie || movie.duration <= 40);
        })
        .slice(0, cardsShow)
    : [];

    const cardsLoading = () => {
      let cardsShowing;
    
      switch (true) {
        case (getScreen >= VIEW_SIZE.L):
          cardsShowing = cardsShow + PLUS_INIT_CARDS.L;
          break;
        case (getScreen >= VIEW_SIZE.M):
          cardsShowing = cardsShow + PLUS_INIT_CARDS.M;
          break;
        default:
          cardsShowing = cardsShow + PLUS_INIT_CARDS.S;
          break;
      }
    
      setCardsShow(cardsShowing);
    };

  const isShowing = cardsShow === filmFiltered.length;
  console.log(firstEntrance)

  return (
    <section className="movies-lists">
      {( pathname === '/movies' && filmFiltered.length === 0 && !firstEntrance) ? (
        <p className='movies__serch-error'>Ничего не найдено</p>
      ) : (
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
        <button type="button" className="movies-lists__button-plus" onClick={cardsLoading}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
