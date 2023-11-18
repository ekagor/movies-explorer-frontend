import { MOVIES_URL } from './MoviesApi';
import { VIEW_SIZE, INIT_CARDS, PLUS_INIT_CARDS } from './constants';

function countAddedMovies(width) {
  let addAmount;
  if (width < VIEW_SIZE.L) addAmount = PLUS_INIT_CARDS.S;
  if (width >= VIEW_SIZE.L) addAmount = PLUS_INIT_CARDS.L;
  return addAmount;
}

function durationMovies(time) {
  return `${Math.floor(time / 60)}ч ${time % 60}м`;
}

function resultCountMovies(width) {
  let moviesCountMovies;
  if (width < VIEW_SIZE.M) moviesCountMovies = INIT_CARDS.S;
  if (width >= VIEW_SIZE.M) moviesCountMovies = INIT_CARDS.M;
  if (width >= VIEW_SIZE.L) moviesCountMovies = INIT_CARDS.L;
  return moviesCountMovies;
}

const movieCardTemplate = (movies) => {
  return movies.map((movie) => {
    return {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }
  })
};

export {    
  countAddedMovies,
  durationMovies,
  resultCountMovies,
  movieCardTemplate,
};
